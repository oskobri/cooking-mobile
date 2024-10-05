import {defineStore} from "pinia";
import {ref} from "vue";
import type {Ingredient} from "@/services/ingredients/types";
import {useRecipesStore} from "@/stores/recipes";
import type {Recipe} from "@/services/recipes/types";

export const useGroceryListsStore = defineStore("groceryListsStore", () => {
    const recipes = ref<Recipe[]>([]);
    const ingredients = ref([]);

    function selectRecipe(recipe: Recipe) {
        recipes.value.push(recipe);
        initIngredients();
    }

    function unselectRecipe(recipeId: number) {
        recipes.value = recipes.value.filter(recipe => recipe.id !== recipeId);
        initIngredients();
    }

    function initIngredients() {
        const mergedIngredients = {};

        useRecipesStore().recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                const key = `${ingredient.name}-${ingredient.unit}`;

                mergedIngredients[key]
                    ? mergedIngredients[key].quantity += ingredient.quantity
                    : mergedIngredients[key] = {...ingredient};

                mergedIngredients[key].isChecked = false;
            });


            ingredients.value = Object
                .values(mergedIngredients)
                .sort((a, b) => a.name.localeCompare(b.name));
        });
    }

    function checkIngredient(index: number)
    {
        ingredients.value[index].checked = !ingredients.value[index].checked;
    }

    return {
        recipes,
        ingredients,
        selectRecipe,
        unselectRecipe,
        initIngredients,
        checkIngredient
    };
});