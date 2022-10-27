import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Activity from "../views/Activity.vue";
import CreateActivity from "../views/CreateActivity.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/activities/:userId", component: Activity },
  { path: "/activity/:userId/create", component: CreateActivity },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
