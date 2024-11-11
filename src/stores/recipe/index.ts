import {defineStore} from "pinia";
import {ref} from "vue";
import type {
    Recipe,
} from "@/services/recipes/types.d";
import {API} from "@/services";
import type {Ingredient} from "@/services/ingredients/types.d";

export const useRecipeStore = defineStore("recipeStore", () => {
    const recipe = ref<Recipe|null>();
    const ingredients = ref<Ingredient[]>([]);
    const servingCount = ref<number>(2);

    function initRecipe(data: Recipe) {
        recipe.value = data;
    }

    function clearRecipe() {
        recipe.value = null;
    }

    function addNewIngredient(data: Ingredient) {
        recipe.value?.ingredients.push(data);
    }

    async function getRecipe(id: number) {
        const response = await API.recipe.getRecipe(id);
        initRecipe(response.data);
        initIngredients();
    }

    async function rateRecipe(recipe_id: number, rating: number) {
        await API.recipe.rateRecipe(recipe_id, rating);
    }

    async function favoriteRecipe(recipe_id: number) {
        await API.recipe.favoriteRecipe(recipe_id);
    }

    async function addIngredientToRecipe(
        recipe_id: number,
        ingredient: number | string,
        quantity: number,
        unit: string,
    ) {
        const response = await API.recipe.addIngredient(recipe_id, ingredient, quantity, unit);

        addNewIngredient(<Ingredient> {
            id: response.data.id,
            name: response.data.name,
            quantity,
            unit
        });
    }


    function setServingCount(count: number) {
        servingCount.value = count;
        initIngredients();
    }

    function initIngredients() {
        ingredients.value = [];
        recipe.value?.ingredients.forEach((ingredient: Ingredient) => {
            const quantity: number = (ingredient.quantity || 0) * servingCount.value;

            ingredients.value.push({
                ...ingredient,
                quantity,
            });
        });
    }

    return {
        recipe,
        ingredients,
        servingCount,
        setServingCount,
        clearRecipe,
        getRecipe,
        addIngredientToRecipe,
        rateRecipe,
        favoriteRecipe,
    };
});