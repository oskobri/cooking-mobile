import {defineStore} from "pinia";
import {ref} from "vue";
import type { Recipe} from "@/services/recipes/types";
import type {GroceryList, InputCreateGroceryList, InputUpdateGroceryList} from "@/services/grocery-lists/types";
import {API} from "@/services";
import type {Ingredient} from "@/services/ingredients/types";

export const useGroceryListStore = defineStore("groceryListStore", () => {
    const groceryList = ref<GroceryList | null>(null);

    const recipes = ref<Recipe[]>([]);
    const ingredients = ref<Ingredient[]>([]);
    const servingCount = ref(2);

    function setServingCount(count: number) {
        servingCount.value = count;
        initIngredients();
    }

    function selectRecipe(recipe: Recipe) {
        recipes.value.push(recipe);
    }

    function unselectRecipe(recipeId: number) {
        recipes.value = recipes.value.filter(recipe => recipe.id !== recipeId);
    }

    function initIngredients() {
        const mergedIngredients: {[key: string]: Ingredient} = {};

        const originalIngredients = ingredients.value;

        groceryList.value?.recipes.forEach((recipe: Recipe) => {
            recipe.ingredients.forEach((ingredient: Ingredient) => {
                const key: string = `${ingredient.name}-${ingredient.unit}`;
                const quantity: number = (ingredient.quantity || 0) * servingCount.value;

                if(mergedIngredients[key]) {
                    mergedIngredients[key].quantity = (mergedIngredients[key].quantity ?? 0) + quantity
                }
                else {
                    mergedIngredients[key] = {
                        ...ingredient,
                        quantity,
                        checked: originalIngredients.find(originalIngredient => originalIngredient.id === ingredient.id)?.checked
                    }
                }
            });

            ingredients.value = Object
                .values(mergedIngredients)
                .sort((a, b) => a.name.localeCompare(b.name));
        });
    }

    function initRecipes()
    {
        if(groceryList.value) {
            recipes.value = groceryList.value.recipes;
        }
    }

    function checkIngredient(index: number)
    {
        ingredients.value[index].checked = !ingredients.value[index].checked;
    }

    function clearGroceryList()
    {
        groceryList.value = null;
    }

    async function getGroceryList(id: number) {
        const response = await API.groceryList.getGroceryList(id);
        groceryList.value = response.data;
        initRecipes();
        initIngredients();
    }

    async function createGroceryList(input: InputCreateGroceryList) {
        const response = await API.groceryList.createGroceryList(input);

        groceryList.value = response.data;
    }

    async function updateGroceryList() {

        if(!groceryList.value) {
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

    function $reset() {
        groceryList.value = null;
        recipes.value = [];
        ingredients.value = [];
        servingCount.value = 2;
    }

    return {
        $reset,
        groceryList,
        recipes,
        ingredients,
        servingCount,
        setServingCount,
        selectRecipe,
        unselectRecipe,
        initIngredients,
        checkIngredient,
        createGroceryList,
        updateGroceryList,
        getGroceryList,
        clearGroceryList
    }
});