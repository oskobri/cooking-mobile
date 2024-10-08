import http from "../api";
import type { APIResponse } from "../types";
import type { Recipe, InputCreateRecipe, InputUpdateRecipe } from "./types";

async function getRecipes(page: number) {
    const query = `?page=${page}`;
    return await http.get<APIResponse<Recipe[]>>("recipes" + query);
}

async function getRecipe(id: number) {
    return await http.get<APIResponse<Recipe>>(`recipes/${id}`);
}

async function createRecipe(input: InputCreateRecipe) {
    return await http.post<APIResponse<Recipe>>("recipes", input);
}

async function updateRecipe(id: number, input: InputUpdateRecipe) {
    return await http.put<APIResponse<boolean>>(`recipes/${id}`, input);
}

async function deleteRecipe(id: number) {
    return await http.delete<APIResponse<boolean>>(`recipes/${id}`);
}

async function addIngredient(recipe_id: number, ingredient: number|string, quantity: number, unit: string) {
    const ingredient_id: number|string = typeof ingredient === 'number' ? ingredient : '';

    const data = {
        quantity,
        unit,
    };

    if(ingredient_id === '') {
        data.name = ingredient;
    }

    return await http.post<APIResponse<boolean>>(`recipes/${recipe_id}/ingredients/${ingredient_id}`, data);
}

export default {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    addIngredient,
};