import {defineStore} from "pinia";
import {ref} from "vue";
import type {
    InputCreateRecipe,
    Recipe,
} from "@/services/recipes/types.d";
import {API} from "@/services";
import type {Ingredient} from "@/services/ingredients/types.d";

export const useRecipesStore = defineStore("recipesStore", () => {
    const recipes = ref<Recipe[]>([]);
    const recipe = ref<Recipe | null>();
    const currentPage = ref<number>(1);
    const lastPage = ref<number>(1);
    const sort = ref<string|null>(null);
    const sortDirection = ref<string|null>(null);
    const search = ref<string|null>(null);

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

    async function getRecipes(page?: number, sortInput: string | null = null, sortDirectionInput: string | null = null, searchInput: string | null = null) {
        if (page && page > lastPage.value || !page && currentPage.value > lastPage.value) {
            return;
        }

        if (page) {
            currentPage.value = page;
        }

        if (page === 1) {
            recipes.value = [];
        }

        if (sortInput) {
            sort.value = sortInput;
        }

        if (sortDirectionInput) {
            sortDirection.value = sortDirectionInput;
        }

        if (searchInput !== null) {
            search.value = searchInput;
        }

        const response = await API.recipe.getRecipes(currentPage.value, sort.value, sortDirection.value, search.value);

        currentPage.value === 1
            ? recipes.value = response.data
            : pushRecipes(response.data);

        lastPage.value = response.meta.last_page;
    }

    async function getRecipe(id: number) {
        const response = await API.recipe.getRecipe(id);
        initRecipe(response.data);
    }

    async function createRecipe(input: InputCreateRecipe): Promise<Recipe> {
        const response = await API.recipe.createRecipe(input);
        addNewRecipe(response.data);
        return response.data;
    }

    async function addIngredientToRecipe(recipe_id: number, ingredient: number | string, quantity: number, unit: string) {
        const response = await API.recipe.addIngredient(recipe_id, ingredient, quantity, unit);

        addNewIngredient(<Ingredient>{
            id: response.data.id,
            name: response.data.name,
            quantity,
            unit
        });
    }

    return {
        recipe,
        recipes,
        currentPage,
        clearRecipe,
        getRecipes,
        getRecipe,
        createRecipe,
        addIngredientToRecipe,
    };
});