import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Activity from "../views/Activity.vue";
import CreateActivity from "../views/CreateActivity.vue";
import CreateUser from "../views/CreateUser.vue";
import UpdateUser from "../views/UpdateUser.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/users/create", component: CreateUser },
  { path: "/activities/:userId", component: Activity },
  { path: "/activity/:userId/create", component: CreateActivity },
  { path: "/users/:userId/update", component: UpdateUser },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
