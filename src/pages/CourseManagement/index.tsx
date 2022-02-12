import { Button, Tooltip, message as mess } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { request, useRequest, Link, Redirect } from 'umi';
import { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { query } from 'express';
export type TableListItem = {
  key: number;
  course: string;
  teacher: string;
  config: string;
  image: string;
  disk: string;
  createdAt: any;
};

const CourseManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { run: getCourseList } = useRequest(async () => {
    const courses = await request<API.CourseList>('/api/v1/course', {
      method: 'GET',
    });
    if (courses && courses.code != 200) {
      mess.error(courses.msg);
    }
    const mapdata = {
      data:
        courses.data?.map((course) => {
          const one: TableListItem = {
            key: course.ID,
            course: course.courseName || 'error',
            teacher: course.teacher.username || 'null',
            config: course.machineConfig.cpu + '核' + course.machineConfig.ram + 'GiB' || 'null',
            image: course.image.name || 'null',
            disk: 'tmp',
            createdAt: course.CreatedAt || '',
          };
          return one;
        }) || [],
    };
    console.log(courses);
    console.log(mapdata);
    return mapdata;
  }, {});

  const { run: deleteCourse } = useRequest(async (id: number) => {
    const result = await request<{ code: number; msg: string; data: any }>('/api/v1/course/' + id, {
      method: 'delete',
    });
    if (result.code === 10002) {
      mess.error(result.msg);
    }
    console.log(result);
  });
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'ID',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '课程名',
      dataIndex: 'course',
    },

    {
      title: '课程老师',
      dataIndex: 'teacher',
      initialValue: 'all',
      filters: true,
      onFilter: true,
    },
    {
      title: '配置信息',
      dataIndex: 'config',
      initialValue: 'all',
      filters: true,
      onFilter: true,
    },
    {
      title: '课程使用镜像',
      dataIndex: 'image',
      initialValue: 'all',
      filters: true,
      onFilter: true,
    },
    // {
    //   title: '挂载磁盘',
    //   dataIndex: 'disk',
    //   initialValue: 'all',
    //   filters: true,
    //   onFilter: true,
    // },
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
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (text, record, _, action) => [
        <Link
          key="modify"
          to={{ pathname: '/modifyCourse', search: 'id=' + record.key.toString() }}
        >
          修改
        </Link>,
        <a
          key="detail"
          onClick={() => {
            console.log('click detail');
          }}
        >
          详情
        </a>,
        <a
          key="delete"
          onClick={async () => {
            await deleteCourse(record.key);
            action?.reload();
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          // todo 将请求发送给后端，返回已经有的列表
          console.log('params: ', params, 'sorter: ', sorter, 'filter: ', filter);
          return {
            data: await getCourseList(),
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
          title: '课程',
          // tooltip: '这是一个标题提示',
        }}
        toolBarRender={() => [
          // <Link to="/createVM">   可以链接到对应的路由
          <Link to="/createCourse">
            <Button type="primary" key="primary" onClick={() => {}}>
              新建课程
            </Button>
          </Link>,
        ]}
      />
    </PageContainer>
  );
};

export default CourseManagement;
