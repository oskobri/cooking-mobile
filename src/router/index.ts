import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeShow from "@/views/RecipeShow.vue";
import RecipeCreate from "@/views/RecipeCreate.vue";
import GroceryListIndex from "@/views/GroceryListIndex.vue";
import GroceryListShow from '@/views/GroceryListShow.vue';
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
            component: RecipeCreate
        },
        {
            path: '/recipes/:id',
            name: 'show-recipe',
            props: true,
            component: RecipeShow
        },
        {
            path: '/grocery-lists',
            name: 'grocery-lists',
            component: GroceryListIndex
        },
        {
            path: '/grocery-list/:id',
            name: 'show-grocery-list',
            props: true,
            component: GroceryListShow,
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
