export type Ingredient = {
    id: number;
    name: string;
    defaultUnit: string;
    quantity?: number;
    unit?: string;
};

export type InputCreateIngredient = {
    name: string;
    defaultUnit: string;
};

export type InputUpdateIngredient = {
    description: string;
    defaultUnit: string;
};