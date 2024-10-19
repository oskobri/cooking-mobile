<template>
    <div
        v-if="selected"
        @click="goToGroceryList"
        class="fixed bottom-24 right-4 z-20 w-12 h-12 bg-accent text-white font-bold rounded-full text-2xl flex items-center justify-center">{{ selected }}</div>
</template>


<script setup lang="ts">
import {useGroceryListStore} from "@/stores/grocery-list";
import {computed} from "vue";
import router from "@/router";
import type {InputCreateGroceryList} from "@/services/grocery-lists/types";

const groceryListStore = useGroceryListStore();

const selected = computed(() => groceryListStore.recipes.length);

const groceryListId = computed(() => groceryListStore.groceryList ? groceryListStore.groceryList.id : null);


async function goToGroceryList() {
  if (!groceryListId.value) {
    await createGroceryList()
  }
  // Update
  else {
    await groceryListStore.updateGroceryList()
  }

  if (groceryListId.value) {
    await router.push({name: 'show-grocery-list', params: {id: groceryListId.value}})
  }
}

async function createGroceryList() {
  const input: InputCreateGroceryList = {
    serving_count: groceryListStore.servingCount,
    recipes: groceryListStore.recipes.map(recipe => recipe.id),
  }

  await groceryListStore.createGroceryList(input);
}

</script>