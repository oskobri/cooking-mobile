<script lang="ts" setup>
import {useRecipeStore} from "@/stores/recipes";
import type {InputCreateRecipe} from "@/services/recipes/types";
import Recipe from "@/components/recipes/Recipe.vue";
import {ref} from "vue";
import router from "@/router";

const recipeStore = useRecipeStore();

const name = ref();

async function submit() {
  const input: InputCreateRecipe = {
    name: name.value,
  }
  const {success, content} = await recipeStore.createRecipe(input);

  if (success) {
    router.push({path: `/recipes/${content.data.id}`})
  }
}
</script>

<template>
  <input v-model="name" type="text" :placeholder="$t('recipes.name')" class="input w-full max-w-xs mr-2"/>

  <button @click="submit" class="btn btn-success">{{ $t('common.add') }}</button>
</template>