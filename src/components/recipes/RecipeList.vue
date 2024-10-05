<template>
  <div>
    <div class="min-h-14">
      <RouterLink to="grocery-list" v-show="selected">
        <button
            class="flex justify-between btn-block items-center bg-accent rounded text-white p-2 shadow-2xl duration-300 ease-in-out">
          <span class="text-lg">Afficher la liste de course</span>
          <div class="badge badge-lg badge-outline">{{ selected }}</div>
        </button>
      </RouterLink>
    </div>

    <div class="flex flex-wrap gap-4">
      <div v-for="(recipe, key) in recipesStore.recipes">
          <RecipeCard :id="key" :recipe="recipe" :key="recipe.id"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from "vue";
import RecipeCard from "@/components/recipes/RecipeCard.vue";
import {useGroceryListsStore} from "@/stores/grocery-lists";
import {useRecipesStore} from "@/stores/recipes";

const groceryListsStore = useGroceryListsStore();
const recipesStore = useRecipesStore();

const selected = computed(() => groceryListsStore.recipes.length);

onMounted(async () => {
  const {success, status} = await recipesStore.getRecipes();

  if (!success) {
    console.log("Api status ->", status);
  }
});

</script>

<style scoped></style>