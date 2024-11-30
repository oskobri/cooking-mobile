<template>
  <VanActionSheet v-model:show="showActionSheet" v-if="recipe" :title="recipe.name" class="h-full">
    <template v-if="recipe">
      <figure><img :src="recipe.picture" :alt="recipe.name"/></figure>
      <div class="flex flex-col gap-8 m-6">
        <RecipeInformation/>
        <div class="flex flex-col justify-center items-center">
          <VanRate v-if="isAuthenticated"
                   v-model="rating"
                   color="#ffd21e"
                   void-icon="star"
                   void-color="#eee"/>
          <span class="text-sm text-gray-400">Ma note</span>
        </div>
        <RecipeIngredients/>
        <RecipeInstructions/>
      </div>
    </template>
  </VanActionSheet>
</template>

<script lang="ts" setup>

import {computed} from "vue";
import {storeToRefs} from "pinia";

import {useRecipeStore} from "@/stores/recipe";
import {useAuth} from "@/composables/useAuth";
import RecipeInformation from "@/components/recipes/RecipeInformation.vue";
import RecipeIngredients from "@/components/recipes/RecipeIngredients.vue";
import RecipeInstructions from "@/components/recipes/RecipeInstructions.vue";

const {isAuthenticated} = useAuth();
const recipeStore = useRecipeStore();
const {recipe} = storeToRefs(recipeStore);

const showActionSheet = computed({
  get: () => recipeStore.isOpenedDrawer,
  set: (value: boolean) => recipeStore.isOpenedDrawer = value
});

const rating = computed({
  get: () => recipeStore.recipe?.rating ?? 0,
  set: (value: number) => recipeStore.recipe?.id && recipeStore.rateRecipe(recipeStore.recipe.id, value)
});

</script>