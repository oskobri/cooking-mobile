export type Ingredient = {
    id: number;
    name: string;
    default_unit: string;
    quantity: number;
    unit: string;
};

export type InputCreateIngredient = {
    name: string;
    default_unit: string;
};

export type InputUpdateIngredient = {
    description: string;
    default_unit: string;
};