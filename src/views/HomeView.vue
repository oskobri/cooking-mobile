<template>
  <main>
    <RouterLink
        v-if="groceryList"
        :to="{name: 'show-grocery-list', params: {id: groceryList.id }}"
        class="flex flex-col justify-between items-center w-full p-4 rounded-lg bg-accent text-white text-lg shadow-2xl mb-4">
      <span>Reprendre la dernière liste de course</span>
      <span class="text-sm">{{ groceryList.name }}</span>
    </RouterLink>

    <RecipeList/>
    <GroceryListLink/>
  </main>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {API} from "@/services";
import type {GroceryList} from "@/services/grocery-lists/types.d";
import GroceryListLink from "@/components/grocery-lists/GroceryListLink.vue";
import RecipeList from "@/components/recipes/RecipeList.vue";

const groceryList = ref<GroceryList | null>(null);

onBeforeMount(() => {
  getLastGroceryList();
});

const getLastGroceryList = async () => {
  const response = await API.groceryList.getLastGroceryList();

  groceryList.value = response.data;
}
</script>