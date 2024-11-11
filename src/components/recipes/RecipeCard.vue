<template>
  <div class="bg-base-100 shadow-xl" :class="mode === 'side' ? 'flex flex-row rounded-lg' : 'card card-compact'">
    <router-link v-if="recipe" :to="{ name: 'show-recipe', params: { id: recipe.id } }" :class="mode === 'side' ? 'w-1/3' : ''">
      <RecipePicture :recipe="recipe" :show-favorite="mode !== 'side'"/>
    </router-link>
    <div class="card-body" :class="mode === 'side' ? 'p-2 w-2/3 justify-center' : ''">
      <h2 class="card-title" :class="mode === 'side' ? 'text-sm ' : ''">{{ recipe.name }}</h2>
      <template v-if="mode === 'compact'">
        <RecipeInformation :recipe="recipe"/>
        <div v-if="showActions" class="card-actions">
          <button v-if="!selected" class="btn btn-block btn-outline btn-secondary" @click="selectRecipe">
            {{ $t('common.select') }}
          </button>
          <button v-else class="btn btn-block btn-secondary" @click="unselectRecipe">{{
              $t('common.selected')
            }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {useGroceryListStore} from "@/stores/grocery-list";
import RecipeInformation from "@/components/recipes/RecipeInformation.vue";
import type {Recipe} from "@/services/recipes/types.d";
import RecipePicture from "@/components/recipes/RecipePicture.vue";

const groceryListStore = useGroceryListStore();

const props = withDefaults(defineProps<{
  recipe: Recipe,
  showActions?: boolean,
  mode?: string
}>(), {
  showActions: false,
  mode: 'compact',
});

const selected = computed(() => groceryListStore.recipes.some(recipe => recipe.id === props.recipe.id));

function selectRecipe() {
  groceryListStore.selectRecipe(props.recipe)
}

function unselectRecipe() {
  groceryListStore.unselectRecipe(props.recipe.id)
}

</script>