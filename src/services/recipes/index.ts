import http from "../api";
import type {APIResponse, APIResponsePaginated} from "../types.d";
import type {Recipe, InputCreateRecipe, InputAddIngredient} from "./types.d";
import type {Ingredient} from "@/services/ingredients/types.d";

const apiUrl = 'api/recipes';

async function getRecipes(page: number, sort: string | null = null, sortDirection: string | null = null, search: string | null = null): Promise<APIResponsePaginated<Recipe[]>> {
    try {
        // 2 different routes for guest and logged-in users
        const suffixGuest = localStorage.getItem('token') === null ? '-guest' : '';

        const response =  await http.get<APIResponsePaginated<Recipe[]>>(`${apiUrl + suffixGuest}`, {
            params: {
                page,
                sort,
                sort_direction: sortDirection,
                search
            }
        });
        return response.data;
    } catch(error) {
        throw new Error(`Error when fetching recipes: ${error}`);
    }
}

async function getRecipe(id: number): Promise<APIResponse<Recipe>> {
    try {
        // 2 different routes for guest and logged-in users
        const suffixGuest = localStorage.getItem('token') === null ? '-guest' : '';

        const response =  await http.get<APIResponse<Recipe>>(`${apiUrl + suffixGuest}/${id}`);
        return response.data;
    } catch(error) {
        throw new Error(`Error when fetching recipe ${id}: ${error}`);
    }
}

async function createRecipe(input: InputCreateRecipe): Promise<APIResponse<Recipe>> {
    try {
        const response =  await http.post<APIResponse<Recipe>>(`${apiUrl}`, input);
        return response.data;
    } catch(error) {
        throw new Error(`Error when creating recipe: ${error}`);
    }
}

async function addIngredient(recipe_id: number, ingredient: number|string, quantity: number, unit: string): Promise<APIResponse<Ingredient>> {
    const ingredientId: number|string = typeof ingredient === 'number' ? ingredient : '';

    const data: InputAddIngredient = {
        quantity,
        unit,
    };

    if(ingredientId === '') {
        data.name = ingredient;
    }

    try {
        const response =  await http.post<APIResponse<Ingredient>>(`api/recipes/${recipe_id}/ingredients/${ingredientId}`, data);
        return response.data;
    } catch(error) {
        throw new Error(`Error when adding ingredient to recipe: ${error}`);
    }
}

async function rateRecipe(recipe_id: number, rating: number) {
    try {
        await http.post(`api/recipes/${recipe_id}/ratings`, {rating});
    } catch(error) {
        throw new Error(`Error when rating recipe: ${error}`);
    }
}

async function favoriteRecipe(recipe_id: number) {
    try {
        await http.post(`api/recipes/${recipe_id}/favorites`);
    } catch(error) {
        throw new Error(`Error when favorites recipe: ${error}`);
    }
}

export default {
    getRecipes,
    getRecipe,
    createRecipe,
    addIngredient,
    rateRecipe,
    favoriteRecipe
};