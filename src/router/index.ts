import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BusLinesView from "@/components/views/BusLinesView.vue";
import StopsView from "@/components/views/StopsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Bus Lines",
    component: BusLinesView,
  },
  {
    path: "/stops",
    name: "Stops",
    component: StopsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
