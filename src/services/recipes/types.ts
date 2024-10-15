import type {Ingredient} from "@/services/ingredients/types";

export type Recipe = {
    id: number;
    name: string;
    picture: string
    ingredients: Ingredient[];
    instructions?: string;
    kcal?: number;
    preparationTime?: number;
    totalTime?: number;
    url?: string;
};

export type InputCreateRecipe = {
    name: string;
};

export type InputUpdateRecipe = {
    description: string;
};

export type InputAddIngredient = {
    name?: string|number;
    quantity?: number;
    unit?: string;
};