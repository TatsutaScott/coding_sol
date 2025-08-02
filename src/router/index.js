import { createRouter, createWebHistory } from "vue-router";
import home_view from "@/view/home_view.vue";
import project_view from "@/view/project_view.vue";
import test_view from "@/view/test_view.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: home_view },
    { path: "/wall-drawing/:number", component: project_view },
    { path: "/test", component: test_view },
  ],
});

export default router;
