<template>
  <VanActionSheet v-model:show="showActionSheet" v-if="recipe" :title="recipe.name" class="h-full">
    <template v-if="recipe">
      <figure><img :src="recipe.picture" :alt="recipe.name"/></figure>
      <div class="flex flex-col gap-8 m-6 pb-28">
        <RecipeInformation/>
        <RecipeRating v-if="isAuthenticated"/>
        <RecipeIngredients/>
        <RecipeInstructions/>
      </div>
      <AddButtonToGroceryList/>
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
import AddButtonToGroceryList from "@/components/recipes/AddButtonToGroceryList.vue";
import RecipeRating from "@/components/recipes/RecipeRating.vue";

const {isAuthenticated} = useAuth();
const recipeStore = useRecipeStore();
const {recipe} = storeToRefs(recipeStore);

const showActionSheet = computed({
  get: () => recipeStore.isOpenedDrawer,
  set: (value: boolean) => recipeStore.isOpenedDrawer = value
});

</script>