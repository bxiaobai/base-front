import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/dashboard',
    redirect: '/dashboard/base',
    meta: {
      title: '仪表盘',
      icon: 'app',
      category: 'main'
    },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '概览仪表盘',
          icon: 'chart'
        }
      }
    ]
  },
  {
    path: '/components/list',
    meta: {
      title: '列表组件',
      icon: 'server',
      category: 'components'
    },
    children: [
      {
        path: 'basic',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '基础列表' }
      },
      {
        path: 'card',
        component: () => import('@/views/user/index.vue'),
        meta: { title: '卡片列表' }
      }
    ]
  },

];
