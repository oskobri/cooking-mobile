<template>
  <input v-model="name" type="text" :placeholder="$t('recipes.name')" class="input w-full max-w-xs mr-2"/>

  <button @click="submit" class="btn btn-success">{{ $t('common.add') }}</button>
</template>

<script lang="ts" setup>
import {useRecipesStore} from "@/stores/recipes";
import type {InputCreateRecipe} from "@/services/recipes/types";
import {ref} from "vue";
import router from "@/router";

const recipesStore = useRecipesStore();

const name = ref();

async function submit() {
  const input: InputCreateRecipe = {
    name: name.value,
  }
  const recipe = await recipesStore.createRecipe(input);
  router.push({path: `/recipes/${recipe.id}`})
}
</script>