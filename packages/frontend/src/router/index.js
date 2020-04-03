import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Users from "../views/Users.vue";
import Watch from "../views/Watch.vue";
import Bookmark from "../views/Bookmark.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/user/@:screenName",
    name: "user",
    component: User
  },
  {
    path: "/users",
    name: "users",
    component: Users
  },
  {
    path: "/watch",
    name: "watch",
    component: Watch
  },
  {
    path: "/bookmark",
    name: "bookmark",
    component: Bookmark
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
