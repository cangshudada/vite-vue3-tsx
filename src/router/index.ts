import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../components/home"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
