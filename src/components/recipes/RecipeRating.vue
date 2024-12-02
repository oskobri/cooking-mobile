<template>
  <div class="flex flex-col justify-center items-center">
    <VanRate
       v-model="rating"
       color="#ffd21e"
       void-icon="star"
       void-color="#eee"/>
    <span class="text-sm text-gray-400">Ma note</span>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

import {useRecipeStore} from "@/stores/recipe";

const recipeStore = useRecipeStore();

const rating = computed({
  get: () => recipeStore.recipe?.rating ?? 0,
  set: (value: number) => recipeStore.recipe?.id && recipeStore.rateRecipe(recipeStore.recipe.id, value)
});
</script>