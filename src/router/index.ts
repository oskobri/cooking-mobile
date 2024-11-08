import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowRecipeView from "@/views/ShowRecipeView.vue";
import CreateRecipeView from "@/views/CreateRecipeView.vue";
import GroceryListHistoryView from "@/views/GroceryListHistoryView.vue";
import ShowGroceryListView from '@/views/ShowGroceryListView.vue';
import {useGroceryListStore} from "@/stores/grocery-list";
import LoginView from "@/views/Auth/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
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

    if (!['home', 'show-recipe', 'show-grocery-list'].includes(to.name as string)) {
        groceryListStore.$reset();
    }

    next();
});


export default router
