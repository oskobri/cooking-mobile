<template>
  <main>
    <Recipe v-if="recipeStore.recipe"/>
  </main>
</template>

<script setup lang="ts">
import Recipe from "@/components/recipes/Recipe.vue";
import {useRecipeStore} from "@/stores/recipe";
import {onBeforeMount} from "vue";

const props = defineProps<{
  id: string
}>();

const recipeStore = useRecipeStore();

onBeforeMount(async () => {
  recipeStore.clearRecipe();
  if (props.id) {
    await recipeStore.getRecipe(parseInt(props.id));
  }
});

</script>