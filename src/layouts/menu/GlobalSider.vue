<template>
  <t-menu
    theme="dark"
    :default-value="activePath"
    :collapsed="collapsed"
    :width="collapsed ? '64px' : '200px'"
    @change="handleMenuChange"
  >
    <template #logo>
      <span :class="`${prefix}-side-nav-logo-wrapper`">
        <component
          :is="getLogo()"
          :class="`${prefix}-side-nav-logo-${collapsed ? 't' : 'tdesign'}-logo`"
        />
      </span>
    </template>
    <template v-for="routeGroup in menuRoutes" :key="routeGroup.title">
      <t-menu-group :title="routeGroup.title">
        <template v-for="route in routeGroup.children" :key="route.path">
          <!-- 有子路由的情况 -->
          <t-submenu v-if="route.children?.length" :value="route.path" :title="route.meta.title">
            <template #icon>
              <t-icon :name="route.meta.icon" />
            </template>
            <t-menu-item v-for="child in route.children" :key="child.path" :value="child.path">
              {{ child.meta.title }}
            </t-menu-item>
          </t-submenu>
          <!-- 没有子路由的情况 -->
          <t-menu-item v-else :value="route.path">
            <template #icon>
              <t-icon :name="route.meta.icon" />
            </template>
            {{ route.meta.title }}
          </t-menu-item>
        </template>
      </t-menu-group>
    </template>
  </t-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AssetLogo from '@/assets/assets-t-logo.svg?component'
import AssetLogoFull from '@/assets/assets-logo-full.svg?component'
import router, { allRoutes, generateMenuRoutes } from '@/router/index.js'
import { prefix } from '@/config/global.js'
defineEmits(['toggle-collapse'])
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true, // 确保必须传入
  },
})
const route = useRoute()
// 生成菜单数据结构
const menuRoutes = computed(() => {
  return [
    {
      title: '主导航',
      children: generateMenuRoutes(allRoutes.filter((r) => r.meta?.category === 'main')),
    },
    {
      title: '组件',
      children: generateMenuRoutes(allRoutes.filter((r) => r.meta?.category === 'components')),
    },
    {
      title: '更多',
      children: generateMenuRoutes(allRoutes.filter((r) => r.meta?.category === 'more')),
    },
  ]
})

// 当前激活路径
const activePath = computed(() => {
  return route.matched[0]?.path || ''
})

// 菜单切换处理
const handleMenuChange = (path) => {
  if (path) {
    router.push({ path })
  }
}
const getLogo = () => {
  if (props.collapsed) return AssetLogo
  return AssetLogoFull
}

</script>

<style scoped>

.menu-wrapper {
  flex: 1;
  overflow: hidden;
}

.t-menu {
  transition: width 0.3s ease-in-out, min-width 0.3s ease-in-out !important;
}
/* 优化菜单项动画 */
:deep(.t-menu__item),
:deep(.t-submenu__title) {
  transition:
    padding 0.3s ease-in-out,
    background-color 0.3s ease-in-out !important;
}

</style>
