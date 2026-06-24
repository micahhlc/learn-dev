import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import FoodItem from './components/FoodItems.vue'
import AnimalCollection from './components/AnimalCollection.vue'
import Home from './components/Home.vue'
import NotFoundPage from './components/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
   { path: '/', component: Home },
   { path: '/food', component: FoodItem },
   { path: '/animals', component: AnimalCollection },
   {
      path: '/:pathMatch(.*)*', 
      component: NotFoundPage, // this will catch all undefined paths
   }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
