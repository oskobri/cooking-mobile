import {defineStore} from "pinia";
import {ref} from "vue";
import type {
    InputCreateRecipe,
    InputUpdateRecipe,
    Recipe,
} from "@/services/recipes/types";
import type {APIResponse} from "@/services/types";
import {API} from "@/services";
import type {Ingredient} from "@/services/ingredients/types";

export const useRecipeStore = defineStore("recipeStore", () => {
    const recipes = ref<Recipe[]>([]);
    const selectedRecipes = ref<Recipe[]>([]);
    const recipe = ref<Recipe>();

    function initRecipes(data: Recipe[]) {
        recipes.value = data;
    }

    function initRecipe(data: Recipe) {
        recipe.value = data;
    }

    function addNewRecipe(recipe: Recipe) {
        recipes.value.push(recipe);
    }

    function addNewIngredient(data: Ingredient) {
        recipe.value?.ingredients.push(data);
    }

    function selectRecipe(recipe: Recipe) {
        selectedRecipes.value.push(recipe);
    }

    function unselectRecipe(recipeId: number) {
        selectedRecipes.value = selectedRecipes.value.filter(recipe => recipe.id !== recipeId);
    }

    function removeRecipe(id: number) {
        const idx = recipes.value.findIndex((s) => s.id === id);
        if (idx === -1) return;
        recipes.value.splice(idx, 1);
    }

    async function getRecipes(): Promise<APIResponse<null>> {
        const response = await API.recipe.getRecipes();

        if (response.success && response.status === 200) {
            initRecipes(response.content.data);
        }

        return response;
    }

    async function getRecipe(id: number): Promise<APIResponse<null>> {
        const response = await API.recipe.getRecipe(id);

        if (response.success && response.status === 200) {
            initRecipe(response.content.data);
        }

        return response;
    }

    async function createRecipe(
        input: InputCreateRecipe
    ): Promise<APIResponse<null>> {
        const response = await API.recipe.createRecipe(input);

        if (response.success && response.status === 201) {
            addNewRecipe(response.content.data);
        }

        return response;
    }

    async function updateRecipe(
        id: number,
        input: InputUpdateRecipe
    ): Promise<APIResponse<null>> {
        const response = await API.recipe.updateRecipe(id, input);

        if (response.success && response.status === 200) {
            addNewRecipe(response.content.data);
        }

        return response;
    }

    async function addIngredientToRecipe(
        recipe_id: number,
        ingredient: number | string,
        quantity: number,
        unit: string,
    ): Promise<APIResponse<null>> {
        const response = await API.recipe.addIngredient(recipe_id, ingredient, quantity, unit);

        if (response.success && (response.status === 200 || response.status ===201)) {
            addNewIngredient({
                id: response.content.data.id,
                name: response.content.data.name,
                quantity,
                unit
            });
        }

        return response;
    }

    return {
        recipe,
        recipes,
        selectedRecipes,
        selectRecipe,
        unselectRecipe,
        getRecipes,
        getRecipe,
        createRecipe,
        updateRecipe,
        addIngredientToRecipe,
    };
});