<template>
  <div id="basicLayout">
    <t-layout>
      <t-aside
        :width="siderWidth + 'px'"
        :style="{
          transition: 'width 0.3s ease-in-out',
          willChange: 'width',
        }"
      >
        <GlobalSider :menu="menuList" @toggle-collapse="toggleCollapse" :collapsed="collapsed" />
      </t-aside>
      <t-layout>
        <t-header  class="header">
          <GlobalHeader />
        </t-header>
        <t-content class="content">
          <router-view/>
        </t-content>
      </t-layout>
    </t-layout>
  </div>
</template>
<script setup>
import useLoginUserStore from '@/stores/user.ts'
import DashboardIcon from '@/assets/assets-slide-dashboard.svg'
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout.ts'
import GlobalSider from '@/layouts/menu/GlobalSider.vue'
import GlobalHeader from '@/layouts/header/GlobalHeader.vue'

const collapsed = computed(() => layoutStore.collapsed)
const siderWidth = computed(() => layoutStore.siderWidth)
const layoutStore = useLayoutStore()
const toggleCollapse = () => {
  layoutStore.toggleCollapsed()
}
const menuList = [
  {
    path: '/dashboard',
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: { title: '仪表盘', icon: DashboardIcon },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '概览仪表盘' },
      },
    ],
  },
  {
    path: '/user',
    redirect: '/user/list',
    name: 'user',
    meta: { title: '用户', icon: DashboardIcon },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '用户列表' },
      },
    ],
  },
]

/**
 * 进入首页获取用户信息
 */
const userStore = useLoginUserStore()
userStore.fetchLoginUser()
</script>
<style scoped>
#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

#basicLayout .content {
  padding: 16px;
  overflow: auto;
  height: calc(100vh - 56px);
}

#basicLayout .header {
  background-color: #ffffff;
  border-bottom: 1px solid #efefef;
  padding: 16px;
}

#basicLayout .sider {
  background-color: #ffffff;
}

#basicLayout {
  height: 100vh;
  overflow: auto;
}

.header {
  display: flex;
  align-items: center;      /* 垂直居中 */
  background: #ffffff;
  border-bottom: 1px solid #efefef;
}
</style>
