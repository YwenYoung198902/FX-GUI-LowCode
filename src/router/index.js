import Vue from "vue";
import VueRouter from "vue-router";
import ChartLowCode from "../views/ChartLowCode/index.vue";
import Earth from "../views/Earth/index";
import Home from "../views/Home/index.vue";
import DataSource from "../views/DataSource/index.vue";
import Cockpit from "../views/Cockpit/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/earth",
    name: "earth",
    component: Home,
    children: [
      {
        path: "/home/:id?",
        name: "Home",
        components: {
          main: Home,
        },
      },
      {
        path: "/chart",
        name: "Chart",
        components: {
          main: ChartLowCode,
        },
      },
      {
        path: "/data",
        name: "DataSource",
        components: {
          main: DataSource,
        },
      },
      {
        path: "/earth",
        name: "Earth",
        components: {
          main: Earth,
        },
      },
     
    ],
  },
  {
    path: "/view/:id?",
    name: "Earth",
    component: Cockpit,
  },
  {
    path: "/",
    redirect: '/earth'
  },
];

const router = new VueRouter({
  // mode: "history",
  // base: "./",
  routes,
});

export default router;
