<template>
    <figure class="relative">
      <img
          :src="recipe.picture"
          :alt="recipe.name"/>
      <IconHeart v-if="showFavorite"
                 @click.prevent="toggleFavorite"
                 class="absolute top-2 right-2 mask mask-heart"
                 :fill="favorite ? 'orange' : 'white'"/>
    </figure>
</template>
<script setup lang="ts">
import IconHeart from "@/components/icons/IconHeart.vue";
import {onMounted, ref} from "vue";
import type {Recipe} from "@/services/recipes/types";
import {useRecipeStore} from "@/stores/recipe";

const recipeStore = useRecipeStore();


const props = withDefaults(defineProps<{
  recipe: Recipe,
  showFavorite?: boolean
}>(), {
  showFavorite: false,
});

const favorite = ref<boolean>(false);

onMounted(() => {
  favorite.value = props.recipe.favorite ?? false;
});

const toggleFavorite = () => {
  recipeStore.favoriteRecipe(props.recipe.id);
  favorite.value = !favorite.value;
};
</script>