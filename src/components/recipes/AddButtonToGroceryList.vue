<template>
  <button
      class="fixed bottom-8 left-0 right-0 mx-4 bg-accent text-white px-8 py-4 rounded-full shadow-lg text-center text-lg whitespace-nowrap"
      @click="toggleRecipeInGroceryList">
    <template v-if="selected">Retirer de la liste de course</template>
    <template v-else>Ajouter à la liste de course</template>

  </button>
</template>

<script lang="ts" setup>
import {useGroceryListStore} from "@/stores/grocery-list";
import {useRecipeStore} from "@/stores/recipe";
import {computed} from "vue";

const recipeStore = useRecipeStore();
const groceryListStore = useGroceryListStore();

const selected = computed(() => groceryListStore.recipes.some(recipe => recipe.id === recipeStore?.recipe?.id));

const toggleRecipeInGroceryList = () => {
  if (!recipeStore.recipe) {
    return;
  }

  /*if(groceryListStore.groceryList) {
    console.log(groceryListStore.groceryList.recipeUpdatedAt);
  }

  selected.value
    ? groceryListStore.removeRecipeFromGroceryList(recipeStore.recipe.id)
    : groceryListStore.addRecipeToGroceryList(recipeStore.recipe);

  recipeStore.isOpenedDrawer = false;*/
}
</script>