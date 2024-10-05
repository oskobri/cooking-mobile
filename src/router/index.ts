import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowRecipeView from "@/views/ShowRecipeView.vue";
import CreateRecipeView from "@/views/CreateRecipeView.vue";
import GroceryListView from "@/views/GroceryListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/recipes/create',
      name: 'create-recipe',
      component: CreateRecipeView
    },
    {
      path: '/recipes/:id',
      name: 'show-recipe',
      props: true,
      component: ShowRecipeView
    },
    {
      path: '/grocery-list',
      name: 'grocery-list',
      component: GroceryListView,
      meta: { transition: 'slide-left' },
    }
  ]
})

export default router
