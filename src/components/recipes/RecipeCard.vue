<template>
  <div class="card card-compact flex flex-col h-full bg-base-100 w-96 shadow-xl">
    <router-link v-if="recipe" :to="{ name: 'show-recipe', params: { id: recipe.id } }">
      <figure>
        <img
            :src="recipe.picture"
            :alt="recipe.name"/>
      </figure>
    </router-link>
    <div class="card-body flex justify-between">
      <h2 class="card-title">{{ recipe.name }}</h2>
      <div class="card-actions">
        <button v-if="!selected" class="btn btn-block btn-outline btn-secondary" @click="selectRecipe">{{ $t('common.select') }}</button>
        <button v-else class="btn btn-block btn-secondary" @click="unselectRecipe">{{ $t('common.selected') }}</button>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>

import Recipe from "@/components/recipes/Recipe.vue";
import { useRecipeStore } from "@/stores/recipes";
import {computed} from "vue";

const recipeStore = useRecipeStore();

const props = defineProps({
  recipe: Recipe
})

const selected = computed(() => recipeStore.selectedRecipes.some(recipe => recipe.id === props.recipe.id));

function selectRecipe() {
  recipeStore.selectRecipe(props.recipe)
}

function unselectRecipe() {
  recipeStore.unselectRecipe(props.recipe.id)
}

</script>