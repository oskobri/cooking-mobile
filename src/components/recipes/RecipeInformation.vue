<template>
  <div v-if="recipe" class="flex flex-col gap-4 text-sm">

    <div class="flex justify-between items-center px-4">
      <div class="flex flex-col items-center justify-center">
        <IconKnife :width="24" :height="24"/>
        <span class="font-bold">{{
            $tc('common.minute', recipe.preparationTime, {count: recipe.preparationTime})
          }}</span>
      </div>
      <div class="flex flex-col items-center justify-center">
        <IconTime :width="24" :height="24"/>
        <span class="font-bold">{{ $tc('common.minute', recipe.totalTime, {count: recipe.totalTime}) }}</span>
      </div>
      <div class="flex flex-col items-center justify-center" v-if="recipe.kcal">
        <IconFire :width="24" :height="24"/>
        <span class="font-bold">{{ recipe.kcal }} {{ $t('recipes.kcal') }}</span>
      </div>
      <div v-if="recipe.avgRating" class="flex flex-col items-center justify-center">
        <IconStar :width="24" :height="24"/>
        <span class="font-bold">{{ recipe.avgRating }}</span>
      </div>
    </div>

    <h1 class="text-center">{{ recipe.name }}</h1>
  </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";

import {useRecipeStore} from "@/stores/recipe";
import IconKnife from "@/components/icons/IconKnife.vue";
import IconFire from "@/components/icons/IconFire.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconStar from "@/components/icons/IconStar.vue";

const recipeStore = useRecipeStore();
const {recipe} = storeToRefs(recipeStore);

</script>