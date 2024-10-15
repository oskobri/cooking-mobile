import {defineStore} from "pinia";
import {ref} from "vue";
import type { Recipe} from "@/services/recipes/types";
import type {GroceryList, InputCreateGroceryList, InputUpdateGroceryList} from "@/services/grocery-lists/types";
import {API} from "@/services";

export const useGroceryListStore = defineStore("groceryListStore", () => {
    const groceryList = ref<GroceryList | null>(null);

    const recipes = ref<Recipe[]>([]);
    const ingredients = ref([]);
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
        const mergedIngredients = {};

        groceryList.value.recipes.forEach((recipe) => {
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

    function initRecipes()
    {
        recipes.value = groceryList.value.recipes;
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
        if (response.success && response.status === 200) {
            groceryList.value = response.content.data;
            initRecipes();
            initIngredients();
        }
    }

    async function createGroceryList(input: InputCreateGroceryList) {
        const response = await API.groceryList.createGroceryList(input);

        if (response.success && response.status === 201) {
            groceryList.value = response.content.data;
        }
    }

    async function updateGroceryList() {

        const input: InputUpdateGroceryList = {
            name: groceryList.value.name,
            serving_count: servingCount.value,
            recipes: recipes.value.map(recipe => recipe.id),
        };

        const response = await API.groceryList.updateGroceryList(groceryList.value.id, input);

        if (response.success && response.status === 200) {
            groceryList.value = response.content.data;
        }
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