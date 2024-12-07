<template>
  <div v-if="groceryListStore.groceryList">
    <h1 class="text-xl font-bold">{{ groceryListStore.groceryList.name }}</h1>
    <div class="flex flex-wrap gap-4 mb-4">
      <RecipeCard v-for="recipe in groceryListStore.groceryList.recipes"
                  :key="recipe.id"
                  :recipe="recipe"
                  mode="side"/>
    </div>
    <div class="flex justify-end mb-2">
      <QuantitySelector v-model="groceryListStore.servingCount" @update="groceryListStore.setServingCount"/>
    </div>
  <div class="flex flex-col gap-2">
    <div v-for="(ingredient, index) in groceryListStore.ingredients" :key="index">
      <div class="flex justify-between items-center" :class="{ 'opacity-20 line-through': ingredient.checked }">
        <div>
          <span class="inline-flex min-w-24" :class="{ 'line-through': ingredient.checked }">
            <template v-if="ingredient.quantity != 0">{{ ingredient.quantity }}</template> {{ ingredient.unit }}
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
  </div>
</template>

<script lang="ts" setup>
import {useGroceryListStore} from "@/stores/grocery-list";
import {onBeforeMount} from "vue";
import RecipeCard from "@/components/recipes/RecipeCard.vue";
import QuantitySelector from "@/components/input/CounterInput.vue";

const groceryListStore = useGroceryListStore();

const props = defineProps<{
  id: number
}>();

onBeforeMount(() => {
  groceryListStore.getGroceryList(props.id);
});

function checkIngredient(index: number)
{
  groceryListStore.checkIngredient(index)
}

</script>