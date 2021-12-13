import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
const ImageManagement: React.FC = () => {
  return (
    <PageContainer title="这是title" content="这是一个page container中的content">
      <ProCard title="column card" direction="column" ghost gutter={[0, 16]}>
        <ProCard title="horizon" style={{ height: 200 }}>
          Test Components 1{' '}
        </ProCard>
        <ProCard title="ghost" gutter={16} ghost style={{ height: 200 }}>
          <ProCard title="left" colSpan={12}>
            Test Components 2
          </ProCard>
          <ProCard title="right" colSpan={12}>
            Test Components 4
          </ProCard>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default ImageManagement;
