import { Button, Tooltip, Menu } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { request, useRequest, Link } from 'umi';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
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
    title: '课程名',
    dataIndex: 'course',
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
    title: '课程老师',
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
    title: '课程使用镜像',
    dataIndex: 'image',
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
    title: '挂载磁盘',
    dataIndex: 'disk',
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
    render: () => [<a key="link">详情</a>, <a key="link3">删除</a>],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);
const handleAdd = async (): Promise<TableListItem> => {
  // todo 此处将信息发送
  return {
    key: 2,
    name: '192.168.0.1',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 2000000000000),
    config: configs[Math.floor(Math.random() * configs.length)],
    money: Math.floor(Math.random() * 2000) * 4,
    progress: Math.ceil(Math.random() * 100) + 1,
    memo: 4 % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
  };
};

const CourseManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { run } = useRequest(() => {
    return request<API.CourseList>('/api/courses', {
      method: 'GET',
    });
  });
  return (
    <PageContainer>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          // todo 将请求发送给后端，返回已经有的列表
          console.log('params: ', params, 'sorter: ', sorter, 'filter: ', filter);
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
