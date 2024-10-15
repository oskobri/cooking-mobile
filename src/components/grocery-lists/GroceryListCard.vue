<template>
  <div class="collapse collapse-arrow bg-base-200">
    <input type="checkbox"/>
      <div class="collapse-title text-xl font-medium">{{ groceryList.name }}</div>
    <RouterLink :to="{name: 'show-grocery-list', params:{ id: groceryList.id }}">
      <button class="w-full bg-accent text-xl text-white p-2">Aller voir la liste</button>
    </RouterLink>
    <div class="collapse-content flex flex-wrap gap-4">
      <RecipeCard v-for="recipe in groceryList.recipes"
                  :key="groceryList.id"
                  :recipe="recipe"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {GroceryList} from "@/services/grocery-lists/types";
import RecipeCard from "@/components/recipes/RecipeCard.vue";

const props = defineProps<{
  groceryList: GroceryList
}>();
</script>