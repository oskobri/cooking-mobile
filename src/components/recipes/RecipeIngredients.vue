<template>
  <div>
    <div class="flex justify-between items-top mb-4">
      <h2 class="font-bold">Ingrédients</h2>
      <CounterInput v-model="servingCount"/>
    </div>
    <div class="flex flex-col gap-1">
      <div v-for="ingredient in ingredients" :key="`ingredient-${ingredient.id}`">
        <div class="flex justify-between">
          <div>
            <span>{{ ingredient.name }}</span>
          </div>
          <span class="inline-flex">
          <template v-if="ingredient.quantity != 0">{{ ingredient.quantity }}</template> {{ ingredient.unit }}
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {storeToRefs} from "pinia";

import {useRecipeStore} from "@/stores/recipe";
import CounterInput from "@/components/input/CounterInput.vue";

const recipeStore = useRecipeStore();
const {ingredients} = storeToRefs(recipeStore);

const servingCount = computed({
  get: () => recipeStore.servingCount,
  set: (value: number) => recipeStore.setServingCount(value)
});

</script>