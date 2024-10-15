import { defineStore } from "pinia";
import { ref } from "vue";
import type { APIResponse } from "@/services/types";
import { API } from "@/services";
import type {Ingredient} from "@/services/ingredients/types";

export const useIngredientsStore = defineStore("ingredientsStore", () => {
    const ingredients = ref<Ingredient[]>([]);

    function initIngredients(data: Ingredient[]) {
        ingredients.value = data;
    }

    async function getIngredients(name: string|null) {
        const response = await API.ingredient.getIngredients(name);

        if (response.success && response.status === 200) {
            initIngredients(response.content.data);
        }
    }

    return {
        ingredients,
        initIngredients,
        getIngredients
    };
});