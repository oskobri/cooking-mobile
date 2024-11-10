import http from "../api";
import type {APIResponse, APIResponsePaginated} from "../types.d";
import type {Recipe, InputCreateRecipe, InputAddIngredient} from "./types.d";
import type {Ingredient} from "@/services/ingredients/types.d";

const apiUrl = 'api/recipes';

async function getRecipes(page: number, sort: string | null = null, direction: string | null = null): Promise<APIResponsePaginated<Recipe[]>> {
    try {
        // 2 different routes for guest and logged-in users
        const suffixGuest = localStorage.getItem('token') === null ? '-guest' : '';

        const response =  await http.get<APIResponsePaginated<Recipe[]>>(`${apiUrl + suffixGuest}`, {
            params: {
                page,
                sort,
                sort_direction: direction
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

export default {
    getRecipes,
    getRecipe,
    createRecipe,
    addIngredient,
};