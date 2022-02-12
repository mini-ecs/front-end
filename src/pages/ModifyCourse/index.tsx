import { useRef, useState, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import { StepsForm, ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { request, useRequest, history } from 'umi';
import ProCard from '@ant-design/pro-card';
import { message } from 'antd';

const ModifyCourse = (props) => {
  const { run: getMachineConfig } = useRequest(async () => {
    const configs = await request<API.MachineConfigList>('/api/v1/course/configs', {
      method: 'GET',
    });
    console.log(configs);
    return {
      data:
        configs.data?.map((config) => {
          return {
            label: config.cpu + '核' + config.ram + 'GiB',
            value: config.ID,
          };
        }) || [],
    };
  });

  const { run: getImageList } = useRequest(async () => {
    const images = await request<API.ImageList>('/api/v1/image', {
      method: 'GET',
    });

    return {
      data:
        images.data?.map((image) => {
          return {
            label: image.name,
            value: image.name,
          };
        }) || [],
    };
  });
  const { run: getSpecificCourse } = useRequest(async (id: number) => {
    const course = await request<{ data: API.Course }>('/api/v1/course/' + id, {
      method: 'GET',
    });

    return {
      data: course.data,
    };
  });
  const { run: modifyCourse } = useRequest(async (id: number, body: API.ModifyCourseOpt) => {
    console.log('body:', body);
    return request<API.LoginResult>('/api/v1/course/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    });
  });

  const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);
  useEffect(() => {
    const run = async () => {
      const c = await getSpecificCourse(props.location.query.id);
      console.log(c);
      formMapRef.current[0]?.current?.setFieldsValue({
        configs: c.machineConfig.cpu + '核' + c.machineConfig.ram + 'GiB',
        courseName: c.courseName,
        imageName: c.image.name,
        note: undefined,
      });
    };
    run();
  }, [getSpecificCourse, props.location.query.id]); // 如果没有第二个参数，则任何组件渲染有变化时会重新执行useEffect。有的话

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formMapRef={formMapRef}
        onFinish={async () => {
          console.log('all', await formMapRef.current[0]?.current?.validateFields());
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="课程基本信息"
          stepProps={{
            description: '这里填入的都是基本信息',
          }}
          onFinish={async () => {
            const data = await formMapRef.current[0].current?.validateFields();
            console.log('step1', data);
            const msg = await modifyCourse(props.location.query.id, data);
            console.log('return msg', msg);

            if (msg == 'ok') {
              const { query } = history.location;
              const { redirect } = query as {
                redirect: string;
              };
              history.push(redirect || '/course');
            } else {
              message.error('修改失败，请检查课程使用的镜像是否已经被使用');
            }
          }}
        >
          {/* begin step form */}
          <ProFormText
            name={['courseName']}
            label="课程名"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormSelect
            name={['imageName']}
            label="选择快照"
            request={getImageList}
            placeholder="请选择一个快照或镜像"
            rules={[{ required: true, message: '请选择一个快照或镜像' }]}
          />
          <ProFormSelect
            name={['configs']}
            label="选择内存大小和CPU核数"
            request={getMachineConfig}
            placeholder="请选择一个规格"
            // fieldProps={{
            //   optionItemRender(item) {
            //     return item.label + ' - ' + item.value;
            //   },
            // }}
            rules={[{ required: true, message: '请选择一个规格' }]}
          />
          <ProFormTextArea name={['note']} label="备注" width="lg" placeholder="请输入备注" />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};

export default ModifyCourse;
