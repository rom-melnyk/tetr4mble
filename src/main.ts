import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

export const T4 = {
  init() {
    createApp(App).mount('#tetr4mble')
  }
}

;(window as any).T4 = T4
