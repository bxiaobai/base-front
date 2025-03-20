<template>
  <div class="header-operate-left">
    <t-button theme="default" shape="square" variant="text" @click="toggleCollapse">
      <t-icon class="collapsed-icon" name="view-list" />
    </t-button>
  </div>
</template>
<style scoped></style>
<script setup lang="ts">
import useLoginUserStore from '@/stores/user.ts'
import { useLayoutStore } from '@/stores/layout.ts'

const layoutStore = useLayoutStore()
const toggleCollapse = () => {
  layoutStore.toggleCollapsed()
}
//测试pinia
const userStore = useLoginUserStore()
</script>

<style>
.header-operate-left {
  display: flex;
  align-items: normal;
  line-height: 0;

  .collapsed-icon {
    font-size: 20px;
  }
}
</style>
