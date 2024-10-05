<script lang="ts" setup>
import {useRecipeStore} from "@/stores/recipes";
import {ref, useTemplateRef} from "vue";
import units from "@/enums/units";
import {useIngredientStore} from "@/stores/ingredients";

// TODO useIngredientStore
const recipeStore = useRecipeStore();
const ingredientStore = useIngredientStore();


const name = ref();
const quantity = ref();
const unit = ref();
const ingredientId = ref();
const input = useTemplateRef('ingredient-name')

const showIngredientList = ref(false);

async function addIngredient() {
  await recipeStore.addIngredientToRecipe(recipeStore.recipe.id, ingredientId.value || name.value, quantity.value, unit.value);

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

  await ingredientStore.getIngredients(name.value);
  showIngredientList.value = true;
}

function selectIngredient(key: number) {
  ingredientId.value = ingredientStore.ingredients[key].id;
  name.value = ingredientStore.ingredients[key].name;
  unit.value = ingredientStore.ingredients[key].default_unit;
  showIngredientList.value = false;
}

</script>

<template>
  <!-- TODO utiliser plutôt https://primevue.org/ pour le js and front et autocomplete -->
  <h1 class="text-xl mb-4">{{ recipeStore.recipe.name }}</h1>

  <div>Ingrédients</div>
  <div v-for="ingredient in recipeStore.recipe.ingredients">
    {{ ingredient.quantity }} {{ ingredient.unit || ingredient.default_unit }} {{ ingredient.name }}
  </div>

  <div class="flex flex-row gap-2 mt-4">
    <div>
      <input v-model="name" ref="ingredient-name" @input="searchIngredient" type="text" :placeholder="$t('recipes.ingredient.name')"
             class="input  max-w-xs mr-2"/>

      <ul
          v-if="ingredientStore.ingredients.length && showIngredientList"
          class="w-full rounded bg-gray-900   border border-gray-300 px-4 py-2 space-y-1 absolute z-10"
      >
        <li
            v-for="(ingredient, key) in ingredientStore.ingredients"
            :key="ingredient.name"
            @click="selectIngredient(key)"
            class="cursor-pointer hover:bg-gray-700 p-1"
        >
          {{ ingredient.name }}
        </li>
      </ul>
    </div>

    <input v-model="quantity" @keyup.enter="addIngredient" type="text" :placeholder="$t('recipes.ingredient.quantity')" class="input max-w-xs mr-2"/>

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