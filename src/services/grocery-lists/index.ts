import http from "../api";
import type {APIResponse, APIResponsePaginated} from "../types";
import type { GroceryList, InputCreateGroceryList, InputUpdateGroceryList } from "./types";

async function getGroceryLists(page: number): Promise<APIResponsePaginated<GroceryList[]>> {
    try {
        const response = await http.get<APIResponsePaginated<GroceryList[]>>(`grocery-lists?page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error when fetching grocery lists: ${error}`);
    }
}

async function getGroceryList(id: number): Promise<APIResponse<GroceryList>> {
    try {
        const response = await http.get<APIResponse<GroceryList>>(`grocery-lists/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error when fetching grocery list ${id}: ${error}`);
    }
}

async function getLastGroceryList(): Promise<APIResponse<GroceryList>> {
    try {
        const response = await http.get<APIResponse<GroceryList>>(`grocery-lists/last`);
        return response.data;
    } catch (error) {
        throw new Error(`Error when fetching last grocery list: ${error}`);
    }
}

async function createGroceryList(input: InputCreateGroceryList): Promise<APIResponse<GroceryList>> {
    try {
        const response = await http.post<APIResponse<GroceryList>>("grocery-lists", input);
        return response.data;
    } catch (error) {
        throw new Error(`Error when creating grocery list: ${error}`);
    }
}

async function updateGroceryList(id: number, input: InputUpdateGroceryList): Promise<APIResponse<GroceryList>> {
    try {
        const response = await http.put<APIResponse<GroceryList>>(`grocery-lists/${id}`, input);
        return response.data;
    } catch (error) {
        throw new Error(`Error when updating grocery list ${id}: ${error}`);
    }
}

async function deleteGroceryList(id: number): Promise<number> {
    try {
        const response = await http.delete<APIResponse<GroceryList>>(`grocery-lists/${id}`);
        return response.status;
    } catch (error) {
        throw new Error(`Error when deleting grocery list ${id}: ${error}`);
    }
}

export default {
    getGroceryLists,
    getGroceryList,
    getLastGroceryList,
    createGroceryList,
    updateGroceryList,
    deleteGroceryList
};