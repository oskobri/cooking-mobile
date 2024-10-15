<template>
  <main>
    <RouterLink :to="{name: 'recipes'}">
      < Modifier les recettes
    </RouterLink>
    <GroceryList v-if="id" :id="parseInt(id)" class="mt-4"/>
  </main>
</template>

<script setup lang="ts">
import GroceryList from '@/components/grocery-lists/GroceryList.vue';
import {onBeforeMount} from "vue";
import {useGroceryListStore} from "@/stores/grocery-list";

const props = defineProps({
  id: String
});

const groceryListStore = useGroceryListStore();

onBeforeMount(async () => {
  groceryListStore.clearGroceryList();
})
</script>
