import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import Activity from "../views/Activity.vue";
import CreateActivity from "../views/CreateActivity.vue";
import CreateUser from "../views/CreateUser.vue";
import UpdateUser from "../views/UpdateUser.vue";
import UpdateActivity from "../views/UpdateActivity.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/registration", component: Registration },
    { path: "/users/create", component: CreateUser },
    { path: "/activities/:userId", component: Activity },
    { path: "/activity/:userId/create", component: CreateActivity },
    {
        path: "/activity/:activityId/users/:userId/update",
        component: UpdateActivity,
        name: "UpdateActivity",
    },
    { path: "/users/:userId/update", component: UpdateUser },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;