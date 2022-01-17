import React from 'react';
import { Button, Tooltip, message as mess, Menu, Input } from 'antd';
import { EllipsisOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { request, useRequest, Link } from 'umi';
import { upperFirst } from 'lodash';

export type TableListItem = {
  key: number;
  creator: string;
  createMethod: string;
  location: string;
  createdAt: any;
  updatedAt: any;
};

const ImageManagement = () => {
  const { run: getImageList } = useRequest(async () => {
    const images = await request<API.ImageList>('/api/v1/image', {
      method: 'GET',
    });
    console.log(images);
    const mapdata = {
      data:
        images.data?.map((image) => {
          const one: TableListItem = {
            key: image.ID || 0,
            creator: image.creator?.username || '',
            createMethod: 'default',
            location: image.location || '',
            createdAt: image.CreatedAt,
            updatedAt: image.UpdatedAt,
          };
          return one;
        }) || [],
    };
    console.log(mapdata);
    return mapdata;
  }, {});
  const { run: deleteImage } = useRequest(async (id: number) => {
    const result = await request<{ code: number; msg: string; data: any }>('/api/v1/image/' + id, {
      method: 'delete',
    });
    if (result.code === 10002) {
      mess.error('删除镜像失败，该镜像仍在使用中');
    }
    console.log(result);
  });
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'key',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '创建者',
      dataIndex: 'creator',
    },
    {
      title: '创建方式',
      dataIndex: 'createMethod',
      initialValue: 'all',
      filters: true,
      onFilter: true,
    },
    {
      title: '镜像位置',
      dataIndex: 'location',
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
    {
      title: (
        <>
          最近修改时间
          <Tooltip placement="top" title="这是一段描述">
            <QuestionCircleOutlined style={{ marginLeft: 4 }} />
          </Tooltip>
        </>
      ),
      width: 140,
      key: 'last',
      dataIndex: 'updatedAt',
      valueType: 'date',
      sorter: (a, b) => a.updatedAt - b.updatedAt,
    },
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (text, record, _, action) => [
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
            console.log('click delete');

            await deleteImage(record.key);
            action?.reload();
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={async (params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return {
          data: await getImageList(),
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
        title: '镜像/快照信息',
        // tooltip: '这是一个标题提示',
      }}
      toolBarRender={() => [
        <Button type="primary" key="primary">
          导入镜像
        </Button>,
      ]}
    />
  );
};

export default ImageManagement;
