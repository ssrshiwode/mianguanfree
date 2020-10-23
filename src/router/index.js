import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Weixin from "../views/weixin";
import Download from "../views/download";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/weixin",
    name: "Weixin",
    component: Weixin
  },
  {
    path: "/download",
    name: "Download",
    component: Download
  },
  {
    path: "*",
    redirect: "/home"
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/weixin" && from.path === "/") next("/");
  next();
});

export default router;
