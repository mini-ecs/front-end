import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '计算机科学与技术学院实验中心',
  pwa: false,
  logo: 'https://www.hitsz.edu.cn/media/images/logo.png',
  iconfontUrl: '',
};

export default Settings;
