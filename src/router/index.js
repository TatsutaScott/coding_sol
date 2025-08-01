import { createRouter, createWebHistory } from "vue-router";
import home_view from "@/view/home_view.vue";
import project_view from "@/view/project_view.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: home_view },
    { path: "/wall-drawing/:number", component: project_view },
  ],
});

export default router;
