import {defineStore} from "pinia";
import {ref} from "vue";
import type {GroceryList} from "@/services/grocery-lists/types";
import {API} from "@/services";

export const useGroceryListsStore = defineStore("groceryListsStore", () => {
    const groceryLists = ref<GroceryList[]>([]);

    const currentPage = ref(1);
    const lastPage = ref();


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
        currentPage,
        groceryLists,
        getGroceryLists,
    }
});