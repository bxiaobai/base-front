// stores/layout.ts
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    collapsed: false,
    siderWidth: 200
  }),
  actions: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
      this.siderWidth = this.collapsed ? 64 : 200
    }
  }
})
