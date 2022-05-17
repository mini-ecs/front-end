import { Button, Tooltip, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { request, useRequest, Link } from 'umi';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

const VmManagement: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const { run: getVMList } = useRequest(async () => {
    const vms = await request<API.VMList>('/api/v1/vm', {
      method: 'GET',
    });
    console.log(vms);
    if (vms && vms.code != 200) {
      message.error(vms.msg);
    }
    localStorage.setItem('vmlist', JSON.stringify(vms.data));
    const mapdata = {
      data:
        vms.data?.map((vm) => {
          const one: TableListItem = {
            key: vm.ID,
            name: vm.name,
            ip: vm.ip || ' ',
            creator: vm.creator?.username || ' ',
            config:
              vm.sourceCourse?.machineConfig?.cpu +
              '核' +
              vm.sourceCourse?.machineConfig?.ram +
              'GiB',
            course: vm.sourceCourse?.courseName || ' ',
            status: vm.Status?.Status || ' ',
            createdAt: vm.CreatedAt,
            note: 'todo',
          };
          return one;
        }) || [],
    };
    return mapdata;
  }, {});
  const { run: getCourseList } = useRequest(async () => {
    const courses = await request<API.CourseList>('/api/v1/course', {
      method: 'GET',
    });
    if (courses && courses.code != 200) {
      message.error(courses.msg);
    }
    return {
      data:
        courses.data?.map((course) => {
          return {
            label: course.courseName,
            value: course.courseName,
          };
        }) || [],
    };
  });

  const { run: createVM } = useRequest(async (body: API.NewCourseOpts) => {
    if (!body) {
      console.log('empty create instance body');
      return;
    }
    const res = await request<API.LoginResult>('/api/v1/vm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    });
    console.log(res);
    if (res && res.code != 200) {
      message.error(res.msg);
    }
    return res;
  });

  const { run: deleteVM } = useRequest(async (id: number) => {
    const result = await request<{ code: number; msg: string; data: any }>('/api/v1/vm/delete/' + id, {
      method: 'post',
    });
    console.log(result);
    if (result && result.code != 200) {
      message.error(result.msg);
    }
  });
  const { run: shutDown } = useRequest(async (id: number) => {
    const result = await request<{ code: number; msg: string; data: any }>(
      '/api/v1/vm/shutdown/' + id,
      {
        method: 'post',
      },
    );
    console.log(result);
    if (result && result.code != 200) {
      message.error(result.msg);
    }
  });
  const { run: reboot } = useRequest(async (id: number) => {
    const result = await request<{ code: number; msg: string; data: any }>(
      '/api/v1/vm/reboot/' + id,
      {
        method: 'post',
      },
    );
    console.log(result);
  });
  const { run: start } = useRequest(async (id: number) => {
    const result = await request<{ code: number; msg: string; data: any }>(
      '/api/v1/vm/start/' + id,
      {
        method: 'post',
      },
    );
    console.log(result);
    if (result && result.code != 200) {
      message.error(result.msg);
    }
  });
  const { run: getVNCPort } = useRequest(async (id: number) => {
    const result = await request<{ code: number; msg: string; data: any }>('/api/v1/vm/vnc/' + id, {
      method: 'get',
    });
    console.log('result is', result);
    if (result && result.code != 200) {
      message.error(result.msg);
    }
    return result;
  });

  const { run: makeImage } = useRequest(async (id: number) => {
    const result = await request<{ code: number; msg: string; data: any }>(
      '/api/v1/vm/image/' + id,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(result);
    if (result && result.code != 200) {
      message.error(result.msg);
    }
  });
  type TableListItem = {
    key: number;
    name: string;
    ip: string;
    creator: string;
    config: string;
    course: string;
    status: string;
    createdAt: any;
    note: string;
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名字',
      dataIndex: 'name',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      copyable: true,
      // render: (_) => <a>{_}</a>,
      // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
    },
    {
      title: '创建者',
      dataIndex: 'creator',
    },

    {
      title: '配置信息',
      dataIndex: 'config',
      initialValue: 'all',
      filters: true,
      onFilter: true,
    },
    {
      title: '从属课程',
      dataIndex: 'course',
      initialValue: 'all',
      filters: true,
      onFilter: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      initialValue: 'all',
      filters: true,
      onFilter: true,
    },
    {
      title: (
        <>
          创建时间
          <Tooltip placement="top" title="这是一段描述">
            <QuestionCircleOutlined style={{ marginLeft: 4 }} />
          </Tooltip>
        </>
      ),
      width: 140,
      key: 'since',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    // {
    //   title: '备注',
    //   dataIndex: 'memo',
    //   ellipsis: true,
    //   copyable: true,
    // },
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (text, record, _, action) => [
        <Link key="modify" to={{ pathname: '/vmDetail', search: 'id=' + record.key.toString() }}>
          详情
        </Link>,
        <a
          key="duplicate"
          onClick={async () => {
            const port = await getVNCPort(record.key);
            console.log('port is', port);
            window.open('http://219.223.251.93:' + port + '/vnc.html');
          }}
        >
          远程连接
        </a>,
        <a
          key="delete"
          onClick={async () => {
            console.log(record);
            await deleteVM(record.key);
            action?.reload();
          }}
        >
          删除
        </a>,
        <TableDropdown
          key="actionGroup"
          menus={[
            { key: 'makeImage', name: '制作镜像' },
            // { key: 'resetVM', name: '回滚快照' },
            { key: 'shutdown', name: '关机' },
            { key: 'reboot', name: '重启' },
            { key: 'start', name: '开机' },
          ]}
          onSelect={async (key: string) => {
            console.log('select', key);
            switch (key) {
              case 'makeImage':
                await makeImage(record.key);
                break;
              case 'shutdown':
                await shutDown(record.key);
                break;
              case 'reboot':
                await reboot(record.key);
                break;
              case 'start':
                await start(record.key);
                break;
              default:
            }
            action?.reload();
          }}
        />,
      ],
    },
  ];
  const formRef = useRef<ProFormInstance>();
  return (
    <PageContainer>
      <ModalForm
        title={'新建实例'}
        width="500px"
        visible={createModalVisible}
        formRef={formRef}
        onVisibleChange={handleModalVisible}
        onFinish={async () => {
          const item = await formRef.current?.validateFields();
          console.log('form表格的结果为', item);
          if (item) {
            handleModalVisible(false);
            await createVM(item);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          name={['instanceName']}
          label="实例名称"
          width="md"
          tooltip="最长为 24 位，用于标定的唯一 id"
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />
        <ProFormSelect
          name={['courseName']}
          label="选择课程"
          width="md"
          request={getCourseList}
          placeholder="请选择一个课程"
          rules={[{ required: true, message: '请选择你的课程' }]}
        />
        <ProFormTextArea name={['note']} label="备注" width="xl" placeholder="请输入备注" />
      </ModalForm>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return {
            data: await getVMList(),
          };
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        dateFormatter="string"
        toolbar={{
          title: '实例信息',
          // tooltip: '这是一个标题提示',
        }}
        toolBarRender={() => [
          // <Link to="/createVM">   可以链接到对应的路由
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
              console.log('浮层表格被打开', createModalVisible);
            }}
          >
            创建实例
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default VmManagement;
