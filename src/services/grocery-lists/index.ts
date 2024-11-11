import http from "../api";
import type {APIResponse, APIResponsePaginated} from "../types.d";
import type { GroceryList, InputCreateGroceryList, InputUpdateGroceryList } from "./types.d";

const apiUrl = 'api/grocery-lists';

async function getGroceryLists(page: number): Promise<APIResponsePaginated<GroceryList[]>> {
    try {
        const response = await http.get<APIResponsePaginated<GroceryList[]>>(`${apiUrl}?page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error when fetching grocery lists: ${error}`);
    }
}

async function getGroceryList(id: number): Promise<APIResponse<GroceryList>> {
    try {
        const response = await http.get<APIResponse<GroceryList>>(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error when fetching grocery list ${id}: ${error}`);
    }
}

async function getLastGroceryList(): Promise<APIResponse<GroceryList>> {
    try {
        const response = await http.get<APIResponse<GroceryList>>(`${apiUrl}/last`);
        return response.data;
    } catch (error) {
        throw new Error(`Error when fetching last grocery list: ${error}`);
    }
}

async function createGroceryList(input: InputCreateGroceryList): Promise<APIResponse<GroceryList>> {
    try {
        const response = await http.post<APIResponse<GroceryList>>(`${apiUrl}`, input);
        return response.data;
    } catch (error) {
        throw new Error(`Error when creating grocery list: ${error}`);
    }
}

async function updateGroceryList(id: number, input: InputUpdateGroceryList): Promise<APIResponse<GroceryList>> {
    try {
        const response = await http.put<APIResponse<GroceryList>>(`${apiUrl}/${id}`, input);
        return response.data;
    } catch (error) {
        throw new Error(`Error when updating grocery list ${id}: ${error}`);
    }
}

async function deleteGroceryList(id: number): Promise<number> {
    try {
        const response = await http.delete<APIResponse<GroceryList>>(`${apiUrl}/${id}`);
        return response.status;
    } catch (error) {
        throw new Error(`Error when deleting grocery list ${id}: ${error}`);
    }
}


async function updateGroceryListRecipe(id: number, recipeId: number, done: boolean) {
    try {
        await http.put(`${apiUrl}/${id}/recipes/${recipeId}`, {done});
    } catch (error) {
        throw new Error(`Error when updating recipe ${recipeId} for grocery list ${id}: ${error}`);
    }
}

export default {
    getGroceryLists,
    getGroceryList,
    getLastGroceryList,
    createGroceryList,
    updateGroceryList,
    deleteGroceryList,
    updateGroceryListRecipe
};