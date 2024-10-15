import type {Recipe} from "@/services/recipes/types";

export type GroceryList = {
    id: number;
    name: string;
    servingCount: Number;
    updatedAt: string;
    recipes: Recipe[];
};

export type InputCreateGroceryList = {
    name?: string;
    serving_count: Number;
    recipes: Number[];
};

export type InputUpdateGroceryList = {
    name?: string | null;
    serving_count?: Number;
    recipes?: Number[];
};