import {defineStore} from "pinia";
import {ref} from "vue";
import type {Recipe} from "@/services/recipes/types.d";
import type {GroceryList, InputCreateGroceryList, InputUpdateGroceryList} from "@/services/grocery-lists/types.d";
import {API} from "@/services";
import type {Ingredient} from "@/services/ingredients/types.d";

export const useGroceryListStore = defineStore("groceryListStore", () => {
    const groceryList = ref<GroceryList | null>(null);
    const recipes = ref<Recipe[]>([]);
    const ingredients = ref<Ingredient[]>([]);
    const servingCount = ref<number>(2);

    const setServingCount = (count: number) => {
        servingCount.value = count;
        initIngredients();
    }

    const addRecipeToGroceryList = (recipe: Recipe) => recipes.value.push(recipe);

    const removeRecipeFromGroceryList = (recipeId: number) => {
        recipes.value = recipes.value.filter(recipe => recipe.id !== recipeId);
    }

    const initIngredients = () => {
        const mergedIngredients: { [key: string]: Ingredient } = {};

        const originalIngredients = ingredients.value;

        groceryList.value?.recipes.forEach((recipe: Recipe) => {
            recipe.ingredients.forEach((ingredient: Ingredient) => {
                const key: string = `${ingredient.name}-${ingredient.unit}`;
                const quantity: number = (ingredient.quantity || 0) * servingCount.value;

                if (mergedIngredients[key]) {
                    mergedIngredients[key].quantity = (mergedIngredients[key].quantity ?? 0) + quantity
                } else {
                    mergedIngredients[key] = {
                        ...ingredient,
                        quantity,
                        checked: originalIngredients.find(originalIngredient => originalIngredient.id === ingredient.id)?.checked || false
                    }
                }
            });

            ingredients.value = Object
                .values(mergedIngredients)
                .sort((a, b) => a.name.localeCompare(b.name));
        });
    }

    const initRecipes = () => {
        if (groceryList.value) {
            recipes.value = groceryList.value.recipes;
        }
    }

    const checkIngredient = (index: number) => ingredients.value[index].checked = !ingredients.value[index].checked;

    const clearGroceryList = () => groceryList.value = null;

    const getGroceryList = async(id: number) => {
        const response = await API.groceryList.getGroceryList(id);
        groceryList.value = response.data;
        initRecipes();
        initIngredients();
    }

    const createGroceryList = async(input: InputCreateGroceryList) => {
        const response = await API.groceryList.createGroceryList(input);

        groceryList.value = response.data;
    }

    const updateGroceryList = async() => {
        if (!groceryList.value) {
            return;
        }

        const input: InputUpdateGroceryList = {
            name: groceryList.value.name,
            serving_count: servingCount.value,
            recipes: recipes.value.map(recipe => recipe.id),
        };

        const response = await API.groceryList.updateGroceryList(groceryList.value.id, input);

        groceryList.value = response.data;
    }

    const resetStore = (): void => {
        groceryList.value = null;
        recipes.value = [];
        ingredients.value = [];
        servingCount.value = 2;
    }

    return {
        // State
        groceryList,
        recipes,
        ingredients,
        servingCount,

        // GroceryList management
        setServingCount,
        initIngredients,
        checkIngredient,
        createGroceryList,
        updateGroceryList,
        getGroceryList,
        clearGroceryList,
        addRecipeToGroceryList,
        removeRecipeFromGroceryList,

        // Utilities
        resetStore,
    }
});