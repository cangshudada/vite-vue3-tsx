import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "home",
    meta: {
      type: "home",
    },
    component: () => import("../components/home"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      type: "login",
    },
    component: () => import("../components/login"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../components/404"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");
  if (to.meta.type === "login" && user) {
    next({ name: "home" });
    return;
  }

  if (to.meta.type === "home" && !user) {
    next({ name: "login" });
    return;
  }

  next();
});

export default router;
