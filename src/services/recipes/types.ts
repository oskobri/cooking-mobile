import type {Ingredient} from "@/services/ingredients/types";

export type Recipe = {
    id: number;
    name: string;
    picture: string
    ingredients: Ingredient[];
};

export type InputCreateRecipe = {
    name: string;
};

export type InputUpdateRecipe = {
    description: string;
};