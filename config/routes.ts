export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/vms', name: '实例管理', icon: 'cloud', component: './VmManagement' },
  { path: '/vnc', icon: 'flower', component: './VNC' },
  {
    path: '/course',
    access: 'canAdmin',
    name: '课程管理',
    icon: 'audit',
    component: './CourseManagement',
  },
  {
    path: '/images',
    access: 'canAdmin',
    name: '镜像管理',
    icon: 'border',
    component: './ImageManagement',
  },
  { path: '/createCourse', component: './CreateCourse' },
  { path: '/modifyCourse', component: './ModifyCourse' },
  { path: '/vmDetail', component: './VMDetail' },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
  //     { component: './404' },
  //   ],
  // },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
