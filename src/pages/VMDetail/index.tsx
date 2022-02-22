import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { Badge, Card, Descriptions, Divider, message, Col, Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useRequest, request } from 'umi';
import { Liquid } from '@ant-design/charts';

const Basic = (props) => {
  // console.log(vm);
  const { run: getSpecificCourse } = useRequest(async (id: number) => {
    const course = await request<{ data: API.Course }>('/api/v1/course/' + id, {
      method: 'GET',
    });
    console.log('asdfasdfasdf', course);
    return {
      data: course.data,
    };
  });
  const { run: getVMstat } = useRequest(async (id: number) => {
    const memo = await request<{
      data: {
        rate: number;
        disk: number;
        cpu: number;
      };
    }>('/api/v1/vm/memory/' + id, {
      method: 'GET',
    });
    return {
      data: memo.data,
    };
  });
  const [vm, setVM] = useState<{
    sourceCourse: any;
    ID: number;
  }>();

  useEffect(() => {
    const run = async () => {
      const vms = localStorage.getItem('vmlist');
      if (vms === null) {
        message.error('no such virtual machine');
      }
      const vmobj = JSON.parse(vms!);
      let tmpVM;
      for (let i = 0; i < vmobj.length; i++) {
        if (vmobj[i].ID == props.location.query.id) {
          tmpVM = vmobj[i];
        }
      }
      const c = await getSpecificCourse(tmpVM.sourceCourse.ID);
      console.log(tmpVM);
      tmpVM.sourceCourse = c;
      setVM(tmpVM);
    };
    run();
  }, [getSpecificCourse, props.location.query.id]); // 如果没有第二个参数，则任何组件渲染有变化时会重新执行useEffect。有的话

  useEffect(() => {}, []);

  //   props.location.query.id;
  const [Memo, setMemo] = useState<JSX.Element>();
  const [Disk, setDisk] = useState<JSX.Element>();
  const [CPU, setCPU] = useState<JSX.Element>();
  useEffect(() => {
    const getMemo = async () => {
      const memo = await getVMstat(props.location.query.id);
      const config = {
        percent: memo.rate,
        outline: {
          border: 4,
          distance: 3,
        },
        wave: {
          length: 128,
        },
        height: 160,
      };

      setMemo(<Liquid {...config} />);
      config.percent = memo.disk;
      setDisk(<Liquid {...config} />);
      config.percent = memo.cpu;
      setCPU(<Liquid {...config} />);
    };
    getMemo();
  }, [getVMstat, props.location.query.id]);
  return (
    <PageContainer>
      <Row gutter={[24, 16]}>
        <Col span={8}>
          <Card title="内存使用量" bordered={false}>
            {Memo}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="磁盘使用量" bordered={false}>
            {Disk}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="CPU使用量" bordered={false}>
            {CPU}
          </Card>
        </Col>
        <Col span={24}>
          <Card bordered={false}>
            <Descriptions
              column={{ xs: 1, sm: 1, md: 2 }}
              title={vm?.name}
              style={{ marginBottom: 32 }}
            >
              <Descriptions.Item label="IP地址">{vm?.ip}</Descriptions.Item>
              <Descriptions.Item label="状态">{vm?.Status.Status}</Descriptions.Item>
              <Descriptions.Item label="镜像uuid">{vm?.imageFileLocation}</Descriptions.Item>
              <Descriptions.Item label="创建者">{vm?.creator.username}</Descriptions.Item>
            </Descriptions>
            <Divider style={{ marginBottom: 32 }} />
            <Descriptions
              column={{ xs: 1, sm: 1, md: 2 }}
              title="所属课程信息"
              style={{ marginBottom: 32 }}
            >
              <Descriptions.Item label="课程名">{vm?.sourceCourse.courseName}</Descriptions.Item>
              <Descriptions.Item label="最后更新时间">
                {vm?.sourceCourse.UpdatedAt}
              </Descriptions.Item>
              <Descriptions.Item label="使用的基础镜像">
                {vm?.sourceCourse.image.name}
              </Descriptions.Item>
              <Descriptions.Item label="机器配置">
                {vm?.sourceCourse.machineConfig.cpu}核{vm?.sourceCourse.machineConfig.ram}GiB
              </Descriptions.Item>
              <Descriptions.Item label="课程老师">
                {vm?.sourceCourse.teacher.username}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Basic;
