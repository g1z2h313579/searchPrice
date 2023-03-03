import { defineConfig, history } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '电脑硬件后台管理系统',
    logo: '',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8082/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  routes: [
    {
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      path: '/',
      redirect: '/hardwareManager',
    },
    // {
    //   name: '首页',
    //   path: '/home',
    //   component: './Home',
    // },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //     name: ' CRUD 示例',
    //     path: '/table',
    //     component: './Table',
    // },
    {
      name: '硬件目录管理',
      path: '/hardwareManager',
      component: './hardwareManager',
    },
    {
      name: '硬件详情管理',
      path: 'hardwareDetail',
      component: './hardwareDetail',
    },
    {
      name: '订单管理',
      path: '/order',
      component: './OrderManager',
    },
    {
      name: '用户管理',
      path: '/user',
      component: './UserManager',
    },
  ],
  npmClient: 'pnpm',
});
