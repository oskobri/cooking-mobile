<template>
  <div>
    <div>
      <div class="flex justify-end mb-2">
        <QuantitySelector :initial-quantity="groceryListsStore.servingCount"
                          @update="groceryListsStore.setServingCount"></QuantitySelector>
      </div>
      <RouterLink to="grocery-list" v-show="selected">
        <button
            class="fixed bottom-0 right-0 z-10 flex justify-between items-center w-full p-4 bg-accent text-white text-xl shadow-2xl duration-300 ease-in-out">
          <span class="text-lg">Afficher la liste de course</span>
          <div class="badge badge-lg badge-outline">{{ selected }}</div>
        </button>
      </RouterLink>
    </div>

    <div class="flex flex-wrap gap-4" ref="scrollComponent">
      <div v-for="(recipe, key) in recipesStore.recipes">
        <RecipeCard :id="key" :recipe="recipe" :key="recipe.id"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import RecipeCard from "@/components/recipes/RecipeCard.vue";
import QuantitySelector from "@/components/input/QuantitySelector.vue";
import {useGroceryListsStore} from "@/stores/grocery-lists";
import {useRecipesStore} from "@/stores/recipes";

const groceryListsStore = useGroceryListsStore();
const recipesStore = useRecipesStore();

const selected = computed(() => groceryListsStore.recipes.length);
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