import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Card, List, Button, Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import styles from './Welcome.less';
const { Paragraph } = Typography;

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);
const content = (
  <div className={styles.pageHeaderContent}>
    <p>
      虚拟机管理平台旨在为老师、学生提供方便快捷的虚拟机分发体验。通过老师创建课程、
      学生选择课程的模式，简化虚拟机分发的流程，缓解实验教学过程中遇到的痛点
    </p>
  </div>
);
const extraContent = (
  <div className={styles.extraImg}>
    <img
      alt="这是一个标题"
      src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
    />
  </div>
);

const Welcome: React.FC = () => {
  return (
    <PageContainer content={content} extraContent={extraContent}>
      <div className={styles.cardList}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://img.ixintu.com/download/jpg/202005/9aee0ec5f995f7df1ff537bf413f2d58_610_494.jpg"
                />
              }
              className={styles.card}
            >
              <Card.Meta
                title={
                  <a href="http://10.249.46.250:9001" target="http://10.249.46.250:9001">
                    个人文件管理
                  </a>
                }
                description={
                  <Paragraph className={styles.item} ellipsis={{ rows: 5 }}>
                    每个用户都被分配了一个对象存储的桶，用于存储个人实验文件。在虚拟机内可以挂载个人对象桶，用户可以方便地在管理界面上传和下载自己的实验文件。
                  </Paragraph>
                }
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://img.ixintu.com/download/jpg/202006/33a6eb5faa30333c0f5cf4662d80b71e_610_525.jpg"
                />
              }
              className={styles.card}
            >
              <Card.Meta
                avatar={<img alt="" className={styles.cardAvatar} />}
                title={<a>虚拟机管理</a>}
                description={
                  <Paragraph className={styles.item} ellipsis={{ rows: 5 }}>
                    每个用户都可以选择课程列表中的课程，并根据课程老师设置的虚拟机配置分发一台虚拟机。虚拟机允许用户以浏览器、VNC客户端、SSH等方式远程连接并使用。
                  </Paragraph>
                }
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://img.ixintu.com/download/jpg/20201226/bd744c8e3ff7fddd5e14eccf2a37b54a_512_512.jpg"
                />
              }
              className={styles.card}
            >
              <Card.Meta
                avatar={<img alt="" className={styles.cardAvatar} />}
                title={<a>镜像管理</a>}
                description={
                  <Paragraph className={styles.item} ellipsis={{ rows: 5 }}>
                    老师可以自行上传镜像，也可以根据现有的虚拟机来制作镜像来作为课程设置中要求的镜像。
                  </Paragraph>
                }
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://img.ixintu.com/download/jpg/20200810/a964deb663f318585452ae8d2bb355b7_512_512.jpg"
                />
              }
              className={styles.card}
            >
              <Card.Meta
                avatar={<img alt="" className={styles.cardAvatar} />}
                title={<a>课程管理</a>}
                description={
                  <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                    老师可以创建和编辑自己创建的课程项目，选择对应的镜像作为课程将要创建的虚拟机使用的镜像。
                  </Paragraph>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default Welcome;
