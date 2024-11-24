<template>
  <VanActionSheet v-model:show="showActionSheet" title="title" class="h-full">
    <template v-if="recipe">
      <figure>
        <img :src="recipe.picture" :alt="recipe.name"/>
      </figure>

      <a v-if="recipe.url" :href="recipe.url" target="_blank" rel="noopener noreferrer">
        <h1 class="text-2xl mb-4">{{ recipe.name }}</h1>
      </a>
      <h1 v-else class="text-xl mb-4">{{ recipe.name }}</h1>


      <RecipeInformation :recipe="recipe"/>

      <div class="flex justify-end my-2">
        <QuantitySelector :initial-quantity="recipeStore.servingCount"
                          @update="recipeStore.setServingCount"></QuantitySelector>
      </div>

      <div>Ingrédients</div>
      <div v-for="ingredient in ingredients" :key="ingredient.id">
        {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
      </div>

      <div v-if="recipe.instructions"
           class="text-justify mt-8"
           v-html="recipe.instructions"></div>
    </template>
  </VanActionSheet>
</template>

<script lang="ts" setup>

import {computed} from "vue";
import {storeToRefs} from "pinia";

import QuantitySelector from "@/components/input/QuantitySelector.vue";
import RecipeInformation from "@/components/recipes/RecipeInformation.vue";

import {useRecipeStore} from "@/stores/recipe";

const recipeStore = useRecipeStore();
const {recipe, ingredients} = storeToRefs(recipeStore);

const showActionSheet = computed({
  get: () => recipeStore.isOpenedDrawer,
  set: (value: boolean) => recipeStore.isOpenedDrawer = value
});

</script>