<script setup lang="ts">
import Recipe from "@/components/recipes/Recipe.vue";
import {useRecipeStore} from "@/stores/recipes";
import {onBeforeMount} from "vue";

const props = defineProps({
  id: String
})

const recipeStore = useRecipeStore();

onBeforeMount(async () => {
  await recipeStore.getRecipe(parseInt(props.id));
})

</script>

<template>
  <main>
    <Recipe v-if="recipeStore.recipe"/>
  </main>
</template>
