import {defineStore} from "pinia";
import {ref} from "vue";
import type {GroceryList, InputUpdateGroceryList} from "@/services/grocery-lists/types.d";
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
        pushGroceryLists(response.data);
        lastPage.value = response.meta.last_page;
    }

    async function updateGroceryList(id: number, input: InputUpdateGroceryList) {
        const response = await API.groceryList.updateGroceryList(id, input);
        if(response.data) {
            const indexToReplace = groceryLists.value.findIndex(groceryList => groceryList.id === id);
            if(indexToReplace !== -1) {
                groceryLists.value[indexToReplace] = response.data;
            }
        }
    }

    async function deleteGroceryList(id: number) {
        const status = await API.groceryList.deleteGroceryList(id);
        if(status === 204) {
            const indexToDelete = groceryLists.value.findIndex(groceryList => groceryList.id === id);
            if(indexToDelete !== -1) {
                groceryLists.value.splice(indexToDelete, 1);
            }
        }
    }

    return {
        currentPage,
        groceryLists,
        getGroceryLists,
        updateGroceryList,
        deleteGroceryList
    }
});