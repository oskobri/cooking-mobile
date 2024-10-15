<template>
  <main>
    <RouterLink
        v-if="groceryList"
        :to="{name: 'show-grocery-list', params: {id: groceryList.id }}"
        class="flex flex-col justify-between items-center w-full p-4 rounded-lg bg-accent text-white text-lg shadow-2xl mb-4">
      <span>Voir la dernière liste de course</span>
      <span>{{ groceryList.name }}</span>
    </RouterLink>

    <RouterLink
        :to="{name: 'recipes'}"
        class="flex justify-center items-center w-full p-4 rounded-lg bg-secondary text-white text-lg shadow-2xl mb-4">
      <span>Voir la liste des recettes</span>
    </RouterLink>
  </main>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {API} from "@/services";
import type {GroceryList} from "@/services/grocery-lists/types";

const groceryList = ref<GroceryList | null>(null);

onBeforeMount(() => {
  getLastGroceryList();
});

const getLastGroceryList = async () => {
  const response = await API.groceryList.getLastGroceryList();

  if (response.success && response.status === 200) {
    groceryList.value = response.content.data;
  }
}
</script>