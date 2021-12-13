import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '哈尔滨工业大学（深圳）计算机科学与技术学院',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'HITSZ',
          title: 'HITSZ',
          href: 'https://www.hitsz.edu.cn/index.html',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/mini-ecs',
          blankTarget: true,
        },
        {
          key: 'lincyawer',
          title: 'Lincyaw',
          href: 'https://github.com/Lincyaw',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
