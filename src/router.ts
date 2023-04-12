import { createRouter, createWebHistory } from "vue-router"
import About from "./pages/About.vue";
import HowTo from "./pages/HowTo.vue";
import Level from "./pages/Level.vue";
import SelectLevel from "./pages/SelectLevel.vue";

export const router = createRouter({
  routes: [
    { path: "/about", component: About },
    { path: "/how-to", component: HowTo },
    { path: "/select-level", component: SelectLevel },
    { path: "/level", component: Level },
    { path: "/:pathMatch(.*)*", redirect: "/about" },
    { path: "", redirect: "/about" },
  ],
  history: createWebHistory(),
})