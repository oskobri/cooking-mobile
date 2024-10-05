import http from "../api";
import type { APIResponse } from "../types";
import type { Ingredient, InputCreateIngredient, InputUpdateIngredient } from "./types";

async function getIngredients(name: string|null) {
    return await http.get<APIResponse<Ingredient[]>>(`ingredients?name=${name}`);
}

async function getIngredient(id: number) {
    return await http.get<APIResponse<Ingredient>>(`ingredients/${id}`);
}

async function createIngredient(input: InputCreateIngredient) {
    return await http.post<APIResponse<Ingredient>>("ingredients", input);
}

async function updateIngredient(id: number, input: InputUpdateIngredient) {
    return await http.put<APIResponse<boolean>>(`ingredients/${id}`, input);
}

async function deleteIngredient(id: number) {
    return await http.delete<APIResponse<boolean>>(`ingredients/${id}`);
}

export default {
    getIngredients,
    getIngredient,
    createIngredient,
    updateIngredient,
    deleteIngredient,
};