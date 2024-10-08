<template>
  <a v-if="recipesStore.recipe.url" :href="recipesStore.recipe.url" target="_blank" rel="noopener noreferrer">
    <h1 class="text-xl mb-4">{{ recipesStore.recipe.name }}</h1>
  </a>
  <h1 v-else class="text-xl mb-4">{{ recipesStore.recipe.name }}</h1>

  <div>Ingrédients</div>
  <div v-for="ingredient in recipesStore.recipe.ingredients">
    {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
  </div>

  <div class="flex flex-row gap-2 mt-4">
    <div>
      <input v-model="name" ref="ingredient-name" @input="searchIngredient" type="text"
             :placeholder="$t('recipes.ingredient.name')"
             class="input  max-w-xs mr-2"/>

      <ul
          v-if="ingredientsStore.ingredients.length && showIngredientList"
          class="w-full rounded border border-base-300 px-4 py-2 space-y-1 absolute z-10"
      >
        <li
            v-for="(ingredient, key) in ingredientsStore.ingredients"
            :key="ingredient.name"
            @click="selectIngredient(key)"
            class="cursor-pointer rounded hover:bg-base-300 p-1"
        >
          {{ ingredient.name }}
        </li>
      </ul>
    </div>

    <input v-model="quantity" @keyup.enter="addIngredient" type="text" :placeholder="$t('recipes.ingredient.quantity')"
           class="input max-w-xs mr-2"/>

    <select v-model="unit" @keyup.enter="addIngredient" class="select  max-w-xs">
      <option disabled selected>{{ $t('recipes.ingredient.unit') }}</option>
      <option v-for="unit_option in units" :value="unit_option.value">{{
          $t('enums.units.' + unit_option.name)
        }}
      </option>
    </select>

    <button @click="addIngredient" class="btn btn-success">{{ $t('common.add') }}</button>

  </div>

</template>

<script lang="ts" setup>
import {useRecipesStore} from "@/stores/recipes";
import {ref, useTemplateRef} from "vue";
import units from "@/enums/units";
import {useIngredientsStore} from "@/stores/ingredients";

// TODO useIngredientsStore
const recipesStore = useRecipesStore();
const ingredientsStore = useIngredientsStore();


const name = ref();
const quantity = ref();
const unit = ref();
const ingredientId = ref();
const input = useTemplateRef('ingredient-name')

const showIngredientList = ref(false);

async function addIngredient() {
  await recipesStore.addIngredientToRecipe(recipesStore.recipe.id, ingredientId.value || name.value, quantity.value, unit.value);

  input.value.focus();
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