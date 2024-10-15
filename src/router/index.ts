import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowRecipeView from "@/views/ShowRecipeView.vue";
import CreateRecipeView from "@/views/CreateRecipeView.vue";
import GroceryListHistoryView from "@/views/GroceryListHistoryView.vue";
import ShowGroceryListView from '@/views/ShowGroceryListView.vue';
import RecipeListView from "@/views/RecipeListView.vue";
import {useGroceryListStore} from "@/stores/grocery-list";

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
      path: '/recipes',
      name: 'recipes',
      component: RecipeListView
    },
    {
      path: '/recipes/:id',
      name: 'show-recipe',
      props: true,
      component: ShowRecipeView
    },
    {
      path: '/grocery-lists',
      name: 'grocery-lists',
      component: GroceryListHistoryView
    },
    {
      path: '/grocery-list/:id',
      name: 'show-grocery-list',
      props: true,
      component: ShowGroceryListView,
    }
  ]
});

router.beforeEach((to, from, next) => {
  const groceryListStore = useGroceryListStore();

  if (!['recipes', 'show-recipe', 'show-grocery-list'].includes(to.name)) {
    groceryListStore.$reset();
  }

  next();
});

export default router
