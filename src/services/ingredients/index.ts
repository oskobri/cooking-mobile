import http from "../api";
import type {APIResponsePaginated} from "../types.d";
import type {Ingredient} from "./types.d";

const apiUrl = 'api/ingredients';

async function getIngredients(name: string | null): Promise<APIResponsePaginated<Ingredient[]>> {
    try {
        const response = await http.get<APIResponsePaginated<Ingredient[]>>(`${apiUrl}?name=${name}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error when fetching ingredients: ${error}`);
    }
}

export default {
    getIngredients,
};