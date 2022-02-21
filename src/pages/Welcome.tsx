import React from 'react';
import { Card, Col, Row, Statistic, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Typography } from 'antd';
import styles from './Welcome.less';
import { Gauge, WordCloud, Liquid, RingProgress } from '@ant-design/charts';
import { GridContent } from '@ant-design/pro-layout';
import numeral from 'numeral';

const { Countdown } = Statistic;

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  const config = {
    percent: 0.25,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  };
  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="资源剩余" bodyStyle={{ textAlign: 'center', fontSize: 0 }} bordered={false}>
            <Liquid
              percent={0.25}
              outline={{ border: 4, distance: 8 }}
              wave={{ length: 128 }}
              height={160}
            />
          </Card>
        </Col>
      </Row>
      <Divider style={{ marginBottom: 32 }} />
      <Row gutter={[16, 16]}>
        <Col xl={6} lg={12} sm={12} xs={12} span={8}>
          <Card title="资源剩余" bodyStyle={{ textAlign: 'center', fontSize: 0 }} bordered={false}>
            <Liquid
              percent={0.25}
              outline={{ border: 4, distance: 8 }}
              wave={{ length: 128 }}
              height={160}
            />
          </Card>
        </Col>
        <Col xl={6} lg={12} sm={12} xs={12} span={8}>
          <Card title="资源剩余" bodyStyle={{ textAlign: 'center', fontSize: 0 }} bordered={false}>
            <Liquid
              percent={0.25}
              outline={{ border: 4, distance: 8 }}
              wave={{ length: 128 }}
              height={160}
            />
          </Card>
        </Col>
        <Col xl={6} lg={12} sm={12} xs={12} span={6}>
          <Card title="资源剩余" bodyStyle={{ textAlign: 'center', fontSize: 0 }} bordered={false}>
            <Liquid
              percent={0.25}
              outline={{ border: 4, distance: 8 }}
              wave={{ length: 128 }}
              height={160}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Welcome;
