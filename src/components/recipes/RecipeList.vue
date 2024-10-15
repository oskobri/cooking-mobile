<template>
  <div>
    <div class="flex flex-wrap gap-4" ref="scrollComponent">
      <RecipeCard v-for="recipe in recipesStore.recipes"
                  :key="recipe.id"
                  :recipe="recipe"
                  :show-actions="true"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import RecipeCard from "@/components/recipes/RecipeCard.vue";
import {useRecipesStore} from "@/stores/recipes";

const recipesStore = useRecipesStore();

const scrollComponent = ref(null);
const waitForRecipes = ref(false);

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);

  await recipesStore.getRecipes();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
})

async function handleScroll() {
  let element = scrollComponent.value;
  if (!waitForRecipes.value && element.getBoundingClientRect().bottom < (window.innerHeight + 50)) {
    waitForRecipes.value = true;
    await recipesStore.getRecipes(recipesStore.currentPage + 1);
    waitForRecipes.value = false;
  }
}

</script>

<style scoped></style>