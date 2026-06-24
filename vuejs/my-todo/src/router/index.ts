import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "@/pages/TabsPage.vue";
import HomePage from "@/pages/HomePage.vue";
import TodoPage from "@/pages/TodoPage.vue";
import AboutPage from "@/pages/AboutPage.vue";

const routes = [
  { path: "/", redirect: "/tabs/home" },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      { path: "home", component: HomePage },
      { path: "todo", component: TodoPage },
      { path: "about", component: AboutPage },
      { path: "", redirect: "/tabs/home" },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
