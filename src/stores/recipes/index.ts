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

export const useRecipesStore = defineStore("recipesStore", () => {
    const recipes = ref<Recipe[]>([]);
    const recipe = ref<Recipe|null>();
    const currentPage = ref(1);
    const lastPage = ref();

    function pushRecipes(data: Recipe[]) {
        const ids = recipes.value.map(recipe => recipe.id);
        const dataFiltered = data.filter(recipe => !ids.includes(recipe.id));
        recipes.value = recipes.value.concat(dataFiltered);
    }

    function initRecipe(data: Recipe) {
        recipe.value = data;
    }

    function clearRecipe() {
        recipe.value = null;
    }

    function addNewRecipe(recipe: Recipe) {
        recipes.value.push(recipe);
    }

    function addNewIngredient(data: Ingredient) {
        recipe.value?.ingredients.push(data);
    }

    function removeRecipe(id: number) {
        const idx = recipes.value.findIndex((s) => s.id === id);
        if (idx === -1) return;
        recipes.value.splice(idx, 1);
    }

    async function getRecipes(page?: number) {
        if (page && page > lastPage.value || !page && currentPage.value > lastPage.value) {
            return;
        }

        if (page) {
            currentPage.value = page;
        }

        const response = await API.recipe.getRecipes(currentPage.value);
        if (response.success && response.status === 200) {
            pushRecipes(response.content.data);
            lastPage.value = response.content.meta.last_page;
        }
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
    ) {
        const response = await API.recipe.addIngredient(recipe_id, ingredient, quantity, unit);

        if (response.success && (response.status === 200 || response.status === 201)) {
            addNewIngredient(<Ingredient> {
                id: response.content?.data?.id,
                name: response.content?.data?.name,
                quantity,
                unit
            });
        }
    }

    return {
        recipe,
        recipes,
        currentPage,
        clearRecipe,
        getRecipes,
        getRecipe,
        createRecipe,
        updateRecipe,
        addIngredientToRecipe,
    };
});