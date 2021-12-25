import { Button, Tooltip, Menu } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { Link } from 'umi';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  config: string;
  progress: number;
  money: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
const configs = ['V2G2', 'V2G4', 'V2G8', 'V4G4', 'V4G8'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: '192.168.0.1',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 2000000000000),
    config: configs[Math.floor(Math.random() * configs.length)],
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'IP地址',
    dataIndex: 'name',
    copyable: true,
    // render: (_) => <a>{_}</a>,
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },

  {
    title: '配置信息',
    dataIndex: 'config',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      V2G8: { text: '2 vCPU 8 GiB' },
      V2G4: { text: '2 vCPU 4 GiB' },
      V2G2: { text: '2 vCPU 2 GiB' },
      V4G8: { text: '4 vCPU 8 GiB' },
      V4G16: { text: '4 vCPU 16 GiB' },
      V8G16: { text: '8 vCPU 16 GiB' },
    },
  },
  {
    title: '从属课程',
    dataIndex: 'cource',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: 'A', status: 'Default' },
      close: { text: 'B', status: 'Default' },
      running: { text: 'C', status: 'Processing' },
      online: { text: 'D', status: 'Success' },
      error: { text: 'E', status: 'Error' },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
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
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">详情</a>,
      <a key="link2">复制</a>,
      <a key="link3">删除</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '制作快照' },
          { key: 'delete', name: '回滚快照' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);
const handleAdd = async () => {
  return true;
};
const VmManagement = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer>
      <ModalForm
        title={'新建规则nnnn'}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async () => {
          const success = await handleAdd();

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
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
          // <Button key="danger" danger>
          //   危险按钮
          // </Button>,
          // <Button key="show">查看日志</Button>,
          // <Link to="/createVM">
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
              console.log('form state is ', createModalVisible);
            }}
          >
            创建实例
          </Button>,
          // </Link>,
          // <Dropdown key="menu" overlay={menu}>
          //   <Button>
          //     <EllipsisOutlined />
          //   </Button>
          // </Dropdown>,
        ]}
      />
    </PageContainer>
  );
};

export default VmManagement;
