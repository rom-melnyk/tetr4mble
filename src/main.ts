import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./router"

import levelsJSON from "./assets/levels/levels.json"
import texturesJSON from "./assets/levels/textures.json"
import { loadLevels } from "./providers/level"
import { loadTextures, type TextureJSON } from "./providers/texture"

import "./styles/main.css"

export const T4 = {
  init() {
    loadLevels(levelsJSON)
    loadTextures(texturesJSON as TextureJSON[])

    createApp(App)
      .use(router)
      .mount("#tetr4mble")
  }
}

;(window as any).T4 = T4
