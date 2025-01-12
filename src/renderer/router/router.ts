import { createMemoryHistory, createRouter } from "vue-router";

import Home from "../pages/Home.vue";
import VoyageView from "../pages/VoyageView.vue";

const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/voyage/:id", component: VoyageView, name: "voyage-view" },
];

export default createRouter({
  history: createMemoryHistory(),
  routes,
});
