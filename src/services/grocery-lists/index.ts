import http from "../api";
import type { APIResponse } from "../types";
import type { GroceryList, InputCreateGroceryList, InputUpdateGroceryList } from "./types";

async function getGroceryLists(page: number) {
    const query = `?page=${page}`;
    return await http.get<APIResponse<GroceryList[]>>("grocery-lists" + query);
}

async function getGroceryList(id: number) {
    return await http.get<APIResponse<GroceryList>>(`grocery-lists/${id}`);
}

async function createGroceryList(input: InputCreateGroceryList) {
    return await http.post<APIResponse<GroceryList>>("grocery-lists", input);
}

async function updateGroceryList(id: number, input: InputUpdateGroceryList) {
    return await http.put<APIResponse<boolean>>(`grocery-lists/${id}`, input);
}

async function deleteGroceryList(id: number) {
    return await http.delete<APIResponse<boolean>>(`grocery-lists/${id}`);
}

async function addRecipe(groceryListId: number, recipeId: number) {
    return await http.post<APIResponse<boolean>>(`grocery-lists/${groceryListId}/recipes/${recipeId}`);
}

export default {
    getGroceryLists,
    getGroceryList,
    createGroceryList,
    updateGroceryList,
    deleteGroceryList,
    addRecipe,
};