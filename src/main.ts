import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import { router } from "./router";

export const T4 = {
  init() {
    createApp(App)
      .use(router)
      .mount('#tetr4mble')
  }
}

;(window as any).T4 = T4
