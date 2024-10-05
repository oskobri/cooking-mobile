<template>
  <div>
    <div v-if="selected">
      {{ $t('common.selected') }} : {{ selected }}
      <div v-for="(recipe, key) in recipeStore.selectedRecipes">
        {{ recipe.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useRecipeStore} from "@/stores/recipes";

const recipeStore = useRecipeStore();

const selected = computed(() => recipeStore.selectedRecipes.length);

</script>

<style scoped></style>