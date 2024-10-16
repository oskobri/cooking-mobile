<template>
  <main>
    <Recipe v-if="recipesStore.recipe"/>
  </main>
</template>

<script setup lang="ts">
import Recipe from "@/components/recipes/Recipe.vue";
import {useRecipesStore} from "@/stores/recipes";
import {onBeforeMount} from "vue";

const props = defineProps<{
  id: string
}>();

const recipesStore = useRecipesStore();

onBeforeMount(async () => {
  recipesStore.clearRecipe();
  if (props.id) {
    await recipesStore.getRecipe(parseInt(props.id));
  }
});

</script>