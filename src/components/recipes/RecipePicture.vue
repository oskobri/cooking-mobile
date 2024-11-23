<template>
  <figure :class="[{ 'portrait-container': portrait }]">
    <img
        :src="recipe.picture"
        :alt="recipe.name"
        :class="done ? 'grayscale' : ''"
    />
    <div v-if="portrait" class="flex flex-col absolute inset-x-0 bottom-0 m-3 p-3 rounded-lg backdrop"
         :class="[{ 'gap-2': recipe.name.length < 35 }]">
      <div class="flex justify-between items-start gap-8">
        <span class="text-gray-200 text-xl">
          {{ recipe.name }}
        </span>
        <div
            v-if="recipe.avgRating"
            class="flex items-center self-start text-sm text-white mt-1"
        >
          <IconStar class="mr-1"/>
          {{ recipe.avgRating }}
        </div>
      </div>
      <div class="flex justify-between items-end text-sm text-gray-400">
        <div class="flex gap-2 divide-x divide-gray-400">
          <span v-if="recipe.preparationTime" class="flex items-center gap-1">
            <IconKnife/> {{ recipe.preparationTime }} min
          </span>
          <span v-if="recipe.totalTime" class="flex items-center gap-1 pl-2">
            <IconTime/> {{ recipe.totalTime }} min
          </span>
          <span v-if="recipe.kcal" class="flex items-center gap-1 pl-2">
            <IconFire/> {{ recipe.kcal }} kcal
          </span>
        </div>
        <div>
          <button class="flex items-center justify-center w-12 h-12 rounded-full text-3xl text-gray-300 shadow-md border border-gray-400">
            <span class="transform -translate-y-0.5">+</span>
          </button>
        </div>
      </div>
    </div>
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
import IconStar from "@/components/icons/IconStar.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconKnife from "@/components/icons/IconKnife.vue";
import IconFire from "@/components/icons/IconFire.vue";
import IconPlusCircle from "@/components/icons/IconPlusCircle.vue";

const recipeStore = useRecipeStore();
const groceryListsStore = useGroceryListsStore();

const props = withDefaults(defineProps<{
  recipe: Recipe,
  showFavorite?: boolean,
  groceryListId?: number,
  portrait?: boolean
}>(), {
  showFavorite: false,
  portrait: false
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
  if (!props.groceryListId || props.recipe.groceryListDone === undefined) {
    return;
  }

  done.value = !done.value;
  groceryListsStore.updateGroceryListRecipe(props.groceryListId, props.recipe.id, done.value);
};
</script>


<style scoped>
.portrait-container {
  aspect-ratio: 3/4;
  width: 100%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 0.75rem;
  }
}

.backdrop {
  background-color: rgba(39, 45, 55, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

</style>