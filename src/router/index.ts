import { createRouter, createWebHashHistory, type RouteRecordRaw, useRoute } from 'vue-router'
import uniq from 'lodash/uniq';
import type { MenuRoute } from 'tdesign-vue-next'

// 动态导入模块（Vite 3+ 语法）
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const routeModuleList: RouteRecordRaw[] = [];
Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as { default: RouteRecordRaw[] }).default;
  routeModuleList.push(...(Array.isArray(mod) ? mod : [mod]));
});

// 静态路由
const defaultRouterList: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/user/index.vue'),
  },
  {
    path: '/',
    redirect: '/dashboard/base',
  },
  {
    path: '/:pathMatch(.*)*', // 更安全的通配符语法
    redirect: '/result/404',
  },
];

// 合并路由
export const allRoutes = [...defaultRouterList, ...routeModuleList];

// 生成展开的路由路径
export const getRoutesExpanded = () => {
  const expandedRoutes: string[] = [];
  allRoutes.forEach((item) => {
    if (item.meta?.expanded) expandedRoutes.push(item.path);
    item.children?.forEach((child) => {
      if (child.meta?.expanded) {
        const fullPath = `${item.path}/${child.path}`.replace(/\/+/g, '/');
        expandedRoutes.push(fullPath);
      }
    });
  });
  return uniq(expandedRoutes);
};



export const generateMenuRoutes = (routes: RouteRecordRaw[], parentPath = ''): MenuRoute[] => {
  return routes
    .filter(route => {
      // 过滤不需要显示在菜单中的路由
      const hidden = route.meta?.hidden
      return !hidden && route.path !== '*' && !route.path.startsWith('/:')
    })
    .map((route) => {
      // 处理完整路径
      const fullPath = parentPath
        ? `${parentPath.replace(/\/$/, '')}/${route.path.replace(/^\//, '')}`
        : route.path

      // 构建菜单项
      const menuItem: MenuRoute = {
        path: fullPath,
        title: route.meta?.title || 'Untitled',
        icon: route.meta?.icon || '',
        children: route.children?.length
          ? generateMenuRoutes(route.children, fullPath)
          : undefined,
        meta: {
          ...route.meta,
          expanded: route.meta?.expanded || false,
          single: route.meta?.single || false,
          frameSrc: route.meta?.frameSrc || '',
          frameBlank: route.meta?.frameBlank || false,
        },
        redirect: route.redirect as string | undefined
      }

      return menuItem
    })
    .sort((a, b) => (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0))
}

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
});

export default router;
