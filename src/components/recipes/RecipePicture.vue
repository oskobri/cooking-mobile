<template>
    <figure class="relative">
      <img
          :src="recipe.picture"
          :alt="recipe.name"
          :class="done ? 'grayscale' : ''"
      />
      <IconHeart v-if="!groceryListId && showFavorite"
                 @click.prevent="toggleFavorite"
                 class="absolute top-2 right-2"
                 :fill="favorite ? 'orange' : 'white'"/>
      <IconCheck v-if="groceryListId"
                 @click.prevent="toggleGroceryListRecipeDone"
                 class="absolute top-2 right-2"
                 :fill="done ? 'black' : 'white'"/>
    </figure>
</template>
<script setup lang="ts">
import IconHeart from "@/components/icons/IconHeart.vue";
import {onMounted, ref} from "vue";
import type {Recipe} from "@/services/recipes/types";
import {useRecipeStore} from "@/stores/recipe";
import IconCheck from "@/components/icons/IconCheck.vue";
import {useGroceryListsStore} from "@/stores/grocery-lists";

const recipeStore = useRecipeStore();
const groceryListsStore = useGroceryListsStore();

const props = withDefaults(defineProps<{
  recipe: Recipe,
  showFavorite?: boolean,
  groceryListId?: number
}>(), {
  showFavorite: false,
});

const favorite = ref<boolean>(false);
const done = ref<boolean>(false);

onMounted(() => {
  favorite.value = props.recipe.favorite ?? false;
  done.value = props.recipe.groceryListDone ?? false;
});

const toggleFavorite = () => {
  recipeStore.favoriteRecipe(props.recipe.id);
  favorite.value = !favorite.value;
};

const toggleGroceryListRecipeDone = () => {
  if(!props.groceryListId || props.recipe.groceryListDone === undefined) {
    return;
  }

  done.value = !done.value;
  groceryListsStore.updateGroceryListRecipe(props.groceryListId, props.recipe.id, done.value);
};
</script>