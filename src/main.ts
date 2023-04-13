import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router";

import levelsJSON from "./assets/levels/levels.json"
import { loadLevels } from "./providers/level";

import './assets/main.css'

export const T4 = {
  init() {
    loadLevels(levelsJSON)

    createApp(App)
      .use(router)
      .mount('#tetr4mble')
  }
}

;(window as any).T4 = T4
