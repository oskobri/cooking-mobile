<template>
  <div class="card card-compact flex flex-col bg-base-100 shadow-xl">
    <router-link v-if="recipe" :to="{ name: 'show-recipe', params: { id: recipe.id } }">
      <figure>
        <img
            :src="recipe.picture"
            :alt="recipe.name"/>
      </figure>
    </router-link>
    <div class="card-body">
      <h2 class="card-title">{{ recipe.name }}</h2>
      <RecipeInformation :recipe="recipe" />
      <div v-if="showActions" class="card-actions">
        <button v-if="!selected" class="btn btn-block btn-outline btn-secondary" @click="selectRecipe">
          {{ $t('common.select') }}
        </button>
        <button v-else class="btn btn-block btn-secondary" @click="unselectRecipe">{{ $t('common.selected') }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {computed} from "vue";
import {useGroceryListsStore} from "@/stores/grocery-lists";
import RecipeInformation from "@/components/recipes/RecipeInformation.vue";
import type {Recipe} from "@/services/recipes/types";

const groceryListsStore = useGroceryListsStore();


const props = defineProps<{
  recipe: Recipe,
  showActions?: Boolean
}>();

const selected = computed(() => groceryListsStore.recipes.some(recipe => recipe.id === props.recipe.id));

function selectRecipe() {
  groceryListsStore.selectRecipe(props.recipe)
}

function unselectRecipe() {
  groceryListsStore.unselectRecipe(props.recipe.id)
}

</script>