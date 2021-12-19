import { useRef, useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  StepsForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { request, useRequest } from 'umi';
import ProCard from '@ant-design/pro-card';
import { message } from 'antd';
import { last } from 'lodash';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreateVM = () => {
  const { run } = useRequest(() => {
    return request<API.CourseList>('/api/courses', {
      method: 'GET',
    });
  });

  // const ref1 = useRef<ProFormInstance>();
  // const ref2 = useRef<ProFormInstance>();
  // const ref3 = useRef<ProFormInstance>();
  const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formMapRef={formMapRef}
        onFinish={async () => {
          console.log('all getFieldsFormatValue', formMapRef.current[0]?.current);
          // console.log('all the step is done', formMapRef.current?.getFieldsValue(['base', 'step']));
          // console.log('validate', await formMapRef.current?.validateFields());
          // const ret = formMapRef.current?.validateFieldsReturnFormatValue;
          // if (ret !== undefined) {
          //   const lastdata = await ret();
          //   console.log('lastdata', lastdata);
          // } else {
          //   console.log('empty data');
          // }
          // message.success('提交成功');
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
          title="创建虚拟机"
          stepProps={{
            description: '这里填入的都是基本信息',
          }}
          onFinish={async () => {
            console.log(await formMapRef.current[0].current?.validateFields());
            console.log('step1', formMapRef.current[0].current?.getFieldValue('base'));
            return true;
          }}
        >
          {/* begin step form */}
          <ProFormText
            name={['base', 'name']}
            label="实例名称"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormSelect
            name={['base', 'course']}
            label="选择课程"
            request={run}
            placeholder="请选择一个课程"
            rules={[{ required: true, message: '请选择你的课程' }]}
          />
          <ProFormTextArea
            name={['base', 'note']}
            label="备注"
            width="lg"
            placeholder="请输入备注"
          />
        </StepsForm.StepForm>

        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="step"
          title="设置参数"
          stepProps={{
            description: '这里填入运维参数',
          }}
          onFinish={async () => {
            console.log(
              'step2 getFieldsFormatValue',
              formMapRef.current[1].current?.getFieldsFormatValue?.(),
            );
            console.log('step2', formMapRef.current[1]?.current?.getFieldValue('base'));
            console.log(await formMapRef.current[1].current?.validateFields());

            return true;
          }}
        >
          <ProFormCheckbox.Group
            name={['step', 'choices']}
            label="迁移类型"
            width="lg"
            options={['结构迁移', '全量迁移', '增量迁移', '全量校验']}
          />
          <ProForm.Group>
            <ProFormText name={['step', 'dbname']} label="业务 DB 用户名" />
            <ProFormDatePicker name={['step', 'dbdatetime']} label="记录保存时间" width="sm" />
            <ProFormCheckbox.Group
              name={['step', 'chocheckboxices']}
              label="迁移类型"
              options={['完整 LOB', '不同步 LOB', '受限制 LOB']}
            />
          </ProForm.Group>
        </StepsForm.StepForm>

        <StepsForm.StepForm
          name="lab"
          title="发布实验"
          stepProps={{
            description: '这里填入发布判断',
          }}
          onFinish={async () => {
            console.log('step3', formMapRef.current[2].current?.getFieldValue('base'));
            console.log('step3', await formMapRef.current[2].current?.validateFields());
            return true;
          }}
        >
          <ProFormCheckbox.Group
            name="checkbox"
            label="部署单元"
            rules={[
              {
                required: true,
              },
            ]}
            options={['部署单元1', '部署单元2', '部署单元3']}
          />
          <ProFormSelect
            label="部署分组策略"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue="1"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
          />
          <ProFormSelect
            label="Pod 调度策略"
            name="remark2"
            initialValue="2"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};

export default CreateVM;
