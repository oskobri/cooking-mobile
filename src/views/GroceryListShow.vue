<template>
  <main>
    <GroceryList v-if="id" :id="parseInt(id)" class="mt-4"/>
  </main>
</template>

<script setup lang="ts">
import GroceryList from '@/components/grocery-lists/GroceryList.vue';
import {onBeforeMount} from "vue";
import {useGroceryListStore} from "@/stores/grocery-list";

defineProps<{
  id: string
}>();

const groceryListStore = useGroceryListStore();

onBeforeMount(async () => {
  groceryListStore.clearGroceryList();
})
</script>
