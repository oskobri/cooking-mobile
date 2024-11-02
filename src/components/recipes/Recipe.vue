<template>
  <div v-if="recipeStore.recipe">
    <figure>
      <img
          :src="recipeStore.recipe.picture"
          :alt="recipeStore.recipe.name"/>
    </figure>
    <a v-if="recipeStore.recipe.url" :href="recipeStore.recipe.url" target="_blank" rel="noopener noreferrer">
      <h1 class="text-2xl mb-4">{{ recipeStore.recipe.name }}</h1>
    </a>
    <h1 v-else class="text-xl mb-4">{{ recipeStore.recipe.name }}</h1>

    <RecipeInformation :recipe="recipeStore.recipe"/>

    <div class="flex justify-end my-2">
      <QuantitySelector :initial-quantity="recipeStore.servingCount"
                        @update="recipeStore.setServingCount"></QuantitySelector>
    </div>

    <div>Ingrédients</div>
    <div v-for="ingredient in recipeStore.ingredients" :key="ingredient.id">
      {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
    </div>

    <div class="flex flex-col gap-2 mt-4">
      <div>
        <input v-model="name" ref="ingredient-name" @input="searchIngredient" type="text"
               :placeholder="$t('recipes.ingredient.name')"
               class="input input-bordered w-full"/>
        <ul
            v-if="ingredientsStore.ingredients.length && showIngredientList"
            class="w-full rounded border border-base-300 bg-base-100 px-4 space-y-1 absolute z-10"
        >
          <li
              v-for="(ingredient, key) in ingredientsStore.ingredients"
              :key="ingredient.name"
              @click="selectIngredient(key)"
              class="cursor-pointer rounded w-full hover:bg-base-300 p-1"
          >
            {{ ingredient.name }}
          </li>
        </ul>
      </div>
      <input v-model="quantity" @keyup.enter="addIngredient" type="text"
             :placeholder="$t('recipes.ingredient.quantity')"
             class="input input-bordered w-full"/>

      <select v-model="unit" @keyup.enter="addIngredient" class="select select-bordered w-full">
        <option disabled selected>{{ $t('recipes.ingredient.unit') }}</option>
        <option v-for="unit_option in units" :value="unit_option.value">{{
            $t('enums.units.' + unit_option.name)
          }}
        </option>
      </select>
      <button @click="addIngredient" class="btn btn-success">{{ $t('common.add') }}</button>
    </div>

    <div v-if="recipeStore.recipe.instructions"
         class="text-justify mt-8"
         v-html="recipeStore.recipe.instructions"></div>
  </div>
</template>

<script lang="ts" setup>
import {useRecipeStore} from "@/stores/recipe";
import {ref, useTemplateRef} from "vue";
import units from "@/enums/units";
import {useIngredientsStore} from "@/stores/ingredients";
import QuantitySelector from "@/components/input/QuantitySelector.vue";
import RecipeInformation from "@/components/recipes/RecipeInformation.vue";

const recipeStore = useRecipeStore();
const ingredientsStore = useIngredientsStore();

const name = ref();
const quantity = ref();
const unit = ref();
const ingredientId = ref();
const input = useTemplateRef<HTMLInputElement>('ingredient-name');

const showIngredientList = ref(false);

async function addIngredient() {
  if (!recipeStore.recipe?.id) {
    return;
  }

  await recipeStore.addIngredientToRecipe(recipeStore.recipe.id, ingredientId.value || name.value, quantity.value, unit.value);

  input.value?.focus();
  name.value = null;
  quantity.value = null;
  unit.value = null;
  ingredientId.value = null;
  showIngredientList.value = false;
}

async function searchIngredient() {
  ingredientId.value = null;

  if (name.value === '') {
    return null;
  }

  await ingredientsStore.getIngredients(name.value);
  showIngredientList.value = true;
}

function selectIngredient(key: number) {
  ingredientId.value = ingredientsStore.ingredients[key].id;
  name.value = ingredientsStore.ingredients[key].name;
  unit.value = ingredientsStore.ingredients[key].defaultUnit;
  showIngredientList.value = false;
}

</script>