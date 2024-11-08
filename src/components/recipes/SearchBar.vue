<template>
  <div class="flex relative justify-end items-center">
    <IconSort @click="showActions = !showActions"/>
    <div class="absolute z-50 flex flex-col items-start top-9 right-3 border border-gray-300 bg-base-100 text-gray-600 opacity-95 rounded-lg"
         :class="showActions ? '' : 'hidden'"
         v-on-click-outside="() => showActions = false">
      <span class="w-full py-1 px-5 border-b border-gray-500">Trier par</span>
      <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer" @click="sortBy('created_at', 'desc')">Dernières recettes</span>
      <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer" @click="sortBy('kcal')">Kcal</span>
      <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer" @click="sortBy('preparation_time')">Temps de préparation</span>
      <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer" @click="sortBy('total_time')">Temps total</span>
      <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer" @click="sortBy('name')">Nom</span>
    </div>
  </div>

</template>

<script lang="ts" setup>
import IconSort from "@/components/icons/IconSort.vue";
import {vOnClickOutside} from '@vueuse/components'
import {ref} from "vue";
import {useRecipesStore} from "@/stores/recipes";

const recipesStore = useRecipesStore();

const showActions = ref(false);

const sortBy = (sort: string, direction?: string) => {
  recipesStore.getRecipes(1, sort, direction);
  showActions.value = false;
};
</script>