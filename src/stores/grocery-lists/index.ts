import {defineStore} from "pinia";
import {ref} from "vue";
import type {Recipe} from "@/services/recipes/types";
import type {GroceryList} from "@/services/grocery-lists/types";
import {API} from "@/services";

export const useGroceryListsStore = defineStore("groceryListsStore", () => {
    const recipes = ref<Recipe[]>([]);
    const groceryLists = ref<GroceryList[]>([]);

    const ingredients = ref([]);
    const servingCount = ref(2);

    const currentPage = ref(1);
    const lastPage = ref();

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

    function pushGroceryLists(data: GroceryList[]) {
        const ids = groceryLists.value.map(groceryList => groceryList.id);
        const dataFiltered = data.filter(groceryList => !ids.includes(groceryList.id));
        groceryLists.value = groceryLists.value.concat(dataFiltered);
    }

    async function getGroceryLists(page?: number) {
        if (page && page > lastPage.value || !page && currentPage.value > lastPage.value) {
            return;
        }

        if (page) {
            currentPage.value = page;
        }

        const response = await API.groceryList.getGroceryLists(currentPage.value);
        if (response.success && response.status === 200) {
            pushGroceryLists(response.content.data);
            lastPage.value = response.content.meta.last_page;
        }
    }


    return {
        recipes,
        groceryLists,
        ingredients,
        servingCount,
        setServingCount,
        selectRecipe,
        unselectRecipe,
        initIngredients,
        checkIngredient,
        getGroceryLists
    };
});