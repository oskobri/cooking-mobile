<template>
  <div class="flex flex-col gap-2">
    <div v-for="(ingredient, index) in groceryListsStore.ingredients" :key="index">
      <div class="flex justify-between items-center" :class="{ 'opacity-20 line-through': ingredient.checked }">
        <div>
          <span class="inline-flex min-w-24" :class="{ 'line-through': ingredient.checked }">
            {{ ingredient.quantity }} {{ ingredient.unit }}
          </span>
          <span>{{ ingredient.name }}</span>
        </div>
        <input
            @change="checkIngredient(index)"
            :checked="ingredient.checked"
            value="1"
            type="checkbox"
            class="checkbox checkbox-lg checkbox-secondary">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useGroceryListsStore} from "@/stores/grocery-lists";

const groceryListsStore = useGroceryListsStore();

function checkIngredient(index: number)
{
  groceryListsStore.checkIngredient(index)
}

</script>