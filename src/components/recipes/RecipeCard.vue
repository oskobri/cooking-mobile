<template>
  <div class="bg-base-100 shadow-xl" :class="mode === 'side' ? 'flex flex-row rounded-lg' : 'card card-compact'">

    <div v-if="recipe" :class="mode === 'side' ? 'w-1/3' : ''">
      <RecipePicture @click="showRecipe" :recipe="recipe" :groceryListId :show-favorite="mode !== 'side'" portrait/>
    </div>
    <div class="card-body hidden" :class="mode === 'side' ? 'p-2 w-2/3 justify-center' : ''">
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
import {useRecipeStore} from "@/stores/recipe";

const groceryListStore = useGroceryListStore();
const recipeStore = useRecipeStore();

const props = withDefaults(defineProps<{
  recipe: Recipe,
  showActions?: boolean,
  mode?: string
  groceryListId?: number // From GroceryListCard.vue
}>(), {
  showActions: false,
  mode: 'compact',
});

const selected = computed(() => groceryListStore.recipes.some(recipe => recipe.id === props.recipe.id));

function selectRecipe() {
  groceryListStore.addRecipeToGroceryList(props.recipe)
}

function unselectRecipe() {
  groceryListStore.removeRecipeFromGroceryList(props.recipe.id)
}

function showRecipe() {
  recipeStore.initRecipe(props.recipe, true);
  recipeStore.getRecipe(props.recipe.id)
}

</script>