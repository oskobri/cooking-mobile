import http from "../api";
import type {APIResponsePaginated} from "../types";
import type {Ingredient} from "./types";

async function getIngredients(name: string | null): Promise<APIResponsePaginated<Ingredient[]>> {
    try {
        const response = await http.get<APIResponsePaginated<Ingredient[]>>(`ingredients?name=${name}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error when fetching ingredients: ${error}`);
    }
}

export default {
    getIngredients,
};