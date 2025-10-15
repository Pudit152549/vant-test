import { defineStore } from 'pinia'
export const useUiStore = defineStore('ui', {
  state: () => ({
    keyboardOpen: false,
  }),
  getters: {
    keyboardPaddingMobile: (s) =>
      s.keyboardOpen
        ? '300px' // ปรับตามดีไวซ์ (~260–340px)
        : 'calc(var(--van-tabbar-height,50px)+24px+env(safe-area-inset-bottom))',
  },
})
