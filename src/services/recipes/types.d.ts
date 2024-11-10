import type {Ingredient} from "@/services/ingredients/types.d";

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
    rating?: number;
    ratingAvg?: number;
    ratingCount?: number;
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