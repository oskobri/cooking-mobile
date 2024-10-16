import {defineStore} from "pinia";
import {ref} from "vue";
import {API} from "@/services";
import type {Ingredient} from "@/services/ingredients/types";

export const useIngredientsStore = defineStore("ingredientsStore", () => {
    const ingredients = ref<Ingredient[]>([]);

    function initIngredients(data: Ingredient[]) {
        ingredients.value = data;
    }

    async function getIngredients(name: string | null) {
        const response = await API.ingredient.getIngredients(name);

        initIngredients(response.data);
    }

    return {
        ingredients,
        initIngredients,
        getIngredients
    };
});