import {defineStore} from "pinia";
import {ref} from "vue";
import type {Recipe} from "@/services/recipes/types";

export const useGroceryListsStore = defineStore("groceryListsStore", () => {
    const recipes = ref<Recipe[]>([]);
    const ingredients = ref([]);
    const servingCount = ref(2);

    function setServingCount(count: number) {
        servingCount.value = count;
        initIngredients();
    }

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

        recipes.value.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                const key = `${ingredient.name}-${ingredient.unit}`;
                const quantity = ingredient.quantity * servingCount.value;

                if(mergedIngredients[key]) {
                    mergedIngredients[key].quantity += quantity
                }
                else {
                    mergedIngredients[key] = {...ingredient}
                    mergedIngredients[key].quantity = quantity
                }

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
        servingCount,
        setServingCount,
        selectRecipe,
        unselectRecipe,
        initIngredients,
        checkIngredient
    };
});