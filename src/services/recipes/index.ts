import http from "../api";
import type {APIResponse, APIResponsePaginated} from "../types";
import type {Recipe, InputCreateRecipe, InputAddIngredient} from "./types";
import type {Ingredient} from "@/services/ingredients/types";

async function getRecipes(page: number, sort: string | null = null): Promise<APIResponsePaginated<Recipe[]>> {
    try {
        const response =  await http.get<APIResponsePaginated<Recipe[]>>('recipes', {
            params: {
                page,
                sort
            }
        });
        return response.data;
    } catch(error) {
        throw new Error(`Error when fetching recipes: ${error}`);
    }
}

async function getRecipe(id: number): Promise<APIResponse<Recipe>> {
    try {
        const response =  await http.get<APIResponse<Recipe>>(`recipes/${id}`);
        return response.data;
    } catch(error) {
        throw new Error(`Error when fetching recipe ${id}: ${error}`);
    }
}

async function createRecipe(input: InputCreateRecipe): Promise<APIResponse<Recipe>> {
    try {
        const response =  await http.post<APIResponse<Recipe>>("recipes", input);
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
        const response =  await http.post<APIResponse<Ingredient>>(`recipes/${recipe_id}/ingredients/${ingredientId}`, data);
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