import { ConfigProvider } from 'antd';
import React, { useContext, useMemo } from 'react';
import { ProFormText } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message as mess, Tabs } from 'antd';
import { useState } from 'react';
import './index.less';
import Footer from '@/components/Footer';
import { login, register } from '@/services/ant-design-pro/api';
import ProForm from '@ant-design/pro-form';
import type { ProFormProps } from '@ant-design/pro-form';
import styles from './index.less';
import { history, useModel } from 'umi';

export type LoginFormProps<T> = {
  message: React.ReactNode | false;
  title: React.ReactNode | false;
  subTitle: React.ReactNode | false;
  actions: React.ReactNode;
  logo?: React.ReactNode | string;
} & ProFormProps<T>;

function LoginForm<T = Record<string, any>>(
  props: Partial<LoginFormProps<T>> & { submitText?: string },
) {
  const { submitText, logo, message, title, subTitle, actions, children, ...proFormProps } = props;

  const submitter = {
    searchConfig: {
      submitText: submitText,
    },
    render: (_, dom) => dom.pop(),
    submitButtonProps: {
      size: 'large',
      style: {
        width: '100%',
      },
    },
    ...proFormProps.submitter,
  } as ProFormProps['submitter'];

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-login');
  const getCls = (className: string) => `${baseClassName}-${className}`;

  /** 生成logo 的dom，如果是string 设置为图片 如果是个 dom 就原样保留 */
  const logoDom = useMemo(() => {
    if (!logo) return null;
    if (typeof logo === 'string') {
      return <img src={logo} />;
    }
    return logo;
  }, [logo]);

  return (
    <div className={getCls('container')}>
      <div className={getCls('top')}>
        {title || logoDom ? (
          <div className={getCls('header')}>
            {logoDom ? <span className={getCls('logo')}>{logoDom}</span> : null}
            {title ? <span className={getCls('title')}>{title}</span> : null}
          </div>
        ) : null}
        {subTitle ? <div className={getCls('desc')}>{subTitle}</div> : null}
      </div>
      <div className={getCls('main')}>
        <ProForm isKeyPressSubmit submitter={submitter} {...proFormProps}>
          {message}
          {children}
        </ProForm>
        {actions ? <div className={getCls('other')}>{actions}</div> : null}
      </div>
    </div>
  );
}

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loginFormText, setloginFormText] = useState<string>('登录');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      console.debug('userInfo: ', userInfo);
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    console.log(values);
    if (type === 'account') {
      try {
        // 登录
        const msg = await login({ ...values, type });
        console.log('login message', msg);
        if (msg.code === 200) {
          const defaultLoginSuccessMessage = '登录成功！';
          mess.success(defaultLoginSuccessMessage);
          await fetchUserInfo();
          /** 此方法会跳转到 redirect 参数所在的位置 */

          if (!history) return;
          const { query } = history.location;
          const { redirect } = query as {
            redirect: string;
          };
          history.push(redirect || '/welcome');
          return;
        } else {
          mess.error('fail' + msg.msg);
        }
      } catch (error) {
        const defaultLoginFailureMessage = '登录失败，请重试！';
        mess.error(defaultLoginFailureMessage);
      }
    } else {
      try {
        const msg = await register({ ...values, type });
        if (msg.code === 200) {
          const defaultLoginSuccessMessage = '注册成功';
          mess.success(defaultLoginSuccessMessage);
        } else {
          mess.error('fail' + msg.msg);
        }
      } catch (error) {
        const defaultLoginFailureMessage = '注册失败，请重试！';
        mess.error(defaultLoginFailureMessage);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          // logo={<img alt="logo" src="/hit.png" />}
          title="哈工大深圳计算机科学与技术学院"
          subTitle={'虚拟机管理平台'}
          submitText={loginFormText}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={(typeStr: string) => {
              setType(typeStr);
              setloginFormText(typeStr === 'account' ? '登录' : '注册');
              console.log('tab type is ', typeStr, type);
            }}
          >
            <Tabs.TabPane key="account" tab={'登录'} />
            <Tabs.TabPane key="register" tab={'注册'} />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {type === 'register' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
