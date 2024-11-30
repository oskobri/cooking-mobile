<template>
  <div v-if="recipe?.instructions">
    <h2 class="font-bold">Instructions</h2>
    <div v-html="recipe.instructions"></div>
  </div>
</template>

<script lang="ts" setup>

import {useRecipeStore} from "@/stores/recipe";
import {storeToRefs} from "pinia";

const recipeStore = useRecipeStore();
const {recipe} = storeToRefs(recipeStore);
</script>