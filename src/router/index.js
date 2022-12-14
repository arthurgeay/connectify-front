import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import Activity from "../views/Activity.vue";
import CreateActivity from "../views/CreateActivity.vue";
import CreateUser from "../views/CreateUser.vue";
import UpdateUser from "../views/UpdateUser.vue";
import UpdateActivity from "../views/UpdateActivity.vue";
import Profil from "../views/Profil.vue";
import Map from "../views/Map.vue";
import Weather from "../views/Weather.vue";
import Country from "../views/Country.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/profile", component: Profil },
  { path: "/login", component: Login },
  { path: "/registration", component: Registration },
  { path: "/users/create", component: CreateUser },
  { path: "/activities/:userId", component: Activity },
  { path: "/activity/:userId/create", component: CreateActivity },
  { path: "/map", component: Map },
  {
    path: "/activity/:activityId/users/:userId/update",
    component: UpdateActivity,
    name: "UpdateActivity",
  },
  { path: "/users/:userId/update", component: UpdateUser },
  { path: "/weather", component: Weather },
  { path: "/country", component: Country },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
