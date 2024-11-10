<template>
  <div class="flex justify-between">
    {{ $t('recipes.preparation_time') }}
    <span class="font-bold">{{ $tc('common.minute', recipe.preparationTime, {count: recipe.preparationTime}) }}</span>
  </div>
  <div class="flex justify-between">
    {{ $t('recipes.total_time') }}
    <span class="font-bold">{{ $tc('common.minute', recipe.totalTime, {count: recipe.totalTime}) }}</span>
  </div>
  <div class="flex justify-between">
    {{ $t('recipes.per_serving') }}
    <span class="font-bold">{{ recipe.kcal }} {{ $t('recipes.kcal') }}</span>
  </div>
  <div v-if="isAuthenticated" class="flex justify-between">
    {{ $t('common.rating') }}
    {{ recipe.rating}}
    <div class="rating">
      <input type="radio" v-model="rating" :name="`rating-${recipe.id}`" class="rating-hidden" :checked="!recipe.rating"/>
      <input v-for="ratingValue in [1, 2, 3, 4, 5]"
             type="radio"
             v-model="rating"
             :value="ratingValue"
             :name="`rating-${recipe.id}`"
             class="mask mask-star bg-yellow-500"
             :checked="recipe.rating == ratingValue"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRecipeStore } from "@/stores/recipe";
import {ref, watch} from "vue";
import { useAuth } from "@/composables/useAuth";

const props = defineProps(['recipe']);

const { isAuthenticated } = useAuth();
const recipeStore  = useRecipeStore();

const rating = ref(null);

watch(rating, (newRating) => {
  if(newRating) {
    recipeStore.rateRecipe(props.recipe.id, newRating);
  }
});

</script>