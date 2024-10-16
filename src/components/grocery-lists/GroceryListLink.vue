<template>
    <button
        v-if="selected"
        @click="goToGroceryList"
        class="fixed bottom-0 right-0 z-10 flex justify-between items-center w-full px-6 pb-10 pt-4 bg-accent text-white text-xl shadow-2xl duration-300 ease-in-out">
      <span class="text-lg" v-if="groceryListId">{{ $t('groceryLists.link_button') }}</span>
      <span class="text-lg" v-else>Générer la liste de course</span>
      <div class="badge badge-lg badge-outline">{{ selected }}</div>
    </button>
</template>


<script setup lang="ts">
import {useGroceryListStore} from "@/stores/grocery-list";
import {computed} from "vue";
import router from "@/router";
import type {InputCreateGroceryList} from "@/services/grocery-lists/types";

const groceryListStore = useGroceryListStore();

const selected = computed(() => groceryListStore.recipes.length);

const groceryListId = computed(() => groceryListStore.groceryList ? groceryListStore.groceryList.id : null);

async function goToGroceryList()
{
  if(!groceryListId.value) {
    await createGroceryList()
  }
  // Update
  else {
    await groceryListStore.updateGroceryList()
  }

  if(groceryListId.value) {
    await router.push({name: 'show-grocery-list', params: {id: groceryListId.value}})
  }
}

async function createGroceryList()
{
  const input: InputCreateGroceryList = {
    serving_count: groceryListStore.servingCount,
    recipes: groceryListStore.recipes.map(recipe => recipe.id),
  }

  await groceryListStore.createGroceryList(input);
}

</script>