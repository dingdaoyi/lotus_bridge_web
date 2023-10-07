// 超级系统
export const TrinkingRouter = {
  path: '/',
  name: 'root',
  component: () => import('@/views/layout.vue'),
  redirect: 'southward',
  children: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home.vue'),
      meta: {
        title: '首页',
        disabled: false,
        icon: 'House'
      }
    },
    {
      path: '/point',
      name: 'point',
      component: () => import('@/views/point/point.vue'),
      meta: {
        title: '点位列表',
        disabled: false,
        icon: 'User'
      }
    },
    {
      path: '/group',
      name: 'group',
      component: () => import('@/views/group/group.vue'),
      meta: {
        title: '分组',
        disabled: false,
        icon: 'User'
      }
    },
    {
      path: '/southward',
      name: 'southward',
      component: () => import('@/views/southward/southward.vue'),

      meta: {
        title: '向南应用',
        disabled: true,
        icon: 'User'
      }
    },
    {
      path: '/northward',
      name: 'northward',
      component: () => import('@/views/northward/northward.vue'),
      meta: {
        title: '向北应用',
        disabled: true,
        icon: 'Connection'
      }
    },
    {
      path: '/plugins',
      name: 'plugins',
      component: () => import('@/views/plugins.vue'),
      meta: {
        title: '插件安装',
        disabled: false,
        icon: 'CopyDocument'
      }
    },
    {
      path: '/plugin',
      name: 'plugin',
      component: () => import('@/views/plugin/plugin.vue'),
      meta: {
        title: '插件管理',
        disabled: true,
        icon: 'Collection'
      }
    }
  ],
  meta: {
    root: true,
    title: '熊猫管理云系统',
    icon: ''
  }
};
export default [
  TrinkingRouter,
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      disabled: false,
      icon: '',
      title: '登录'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/notfound.vue'),
    meta: {
      disabled: false,
      icon: '',
      title: '未找到页面'
    }
  }
];
