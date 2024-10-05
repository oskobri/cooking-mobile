<template>
  <div>
    <SelectedRecipeList/>
    <div class="flex flex-wrap gap-2">
      <div v-for="(recipe, key) in recipeStore.recipes">
          <RecipeCard :id="key" :recipe="recipe" :key="recipe.id"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useRecipeStore} from "@/stores/recipes";
import RecipeCard from "@/components/recipes/RecipeCard.vue";
import SelectedRecipeList from "@/components/recipes/SelectedRecipeList.vue";

const recipeStore = useRecipeStore();

onMounted(async () => {
  const {success, status} = await recipeStore.getRecipes();

  if (!success) {
    alert("Ups, something happened 🙂");
    console.log("Api status ->", status);
  }
});


</script>

<style scoped></style>