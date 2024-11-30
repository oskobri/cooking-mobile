import {defineStore} from "pinia";
import {ref} from "vue";
import type {Recipe} from "@/services/recipes/types.d";
import {API} from "@/services";
import type {Ingredient} from "@/services/ingredients/types.d";
import type {APIResponse} from "@/services/types";

export const useRecipeStore = defineStore("recipeStore", () => {
    const defaultServingCount = 2;
    const recipe = ref<Recipe | null>(null);
    const ingredients = ref<Ingredient[]>([]);
    const servingCount = ref<number>(defaultServingCount);
    const isOpenedDrawer = ref<boolean>(false);

    /**
     * Initialize the recipe with data from the recipes list without the ingredients to render drawer faster
     */
    const initRecipe = (newRecipe: Recipe, openDrawer: boolean = false): void => {
        resetStore();
        recipe.value = newRecipe;
        isOpenedDrawer.value = openDrawer;
    }

    const getRecipe = async (recipeId: number): Promise<void> => {
        const response: APIResponse<Recipe> = await API.recipe.getRecipe(recipeId);
        recipe.value = response.data;
        initIngredients();
    }

    const rateRecipe = async (recipeId: number, rating: number): Promise<void> => {
        await API.recipe.rateRecipe(recipeId, rating);

        if (recipe.value?.id === recipeId) {
            recipe.value.rating = rating;
        }
    }

    const favoriteRecipe = async (recipeId: number) => {
        await API.recipe.favoriteRecipe(recipeId);
    }

    const setServingCount = (count: number): void => {
        servingCount.value = count;
        initIngredients();
    }

    const initIngredients = (): void => {
        ingredients.value = [];

        if (!recipe.value) return;

        ingredients.value = recipe.value.ingredients.map((ingredient: Ingredient) => ({
            ...ingredient,
            quantity: (ingredient.quantity || 0) * servingCount.value,
        }));
    }

    const resetStore = (): void => {
        recipe.value = null;
        ingredients.value = [];
        servingCount.value = defaultServingCount;
        isOpenedDrawer.value = false;
    };

    return {
        // State
        recipe,
        ingredients,
        servingCount,
        isOpenedDrawer,

        // Recipe management
        initRecipe,
        getRecipe,
        rateRecipe,
        favoriteRecipe,

        // Ingredient management
        setServingCount,
        initIngredients,

        // Utilities
        resetStore,
    };
});