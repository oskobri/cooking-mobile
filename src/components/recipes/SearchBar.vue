<template>
  <div class="flex gap-2">
    <div class="w-full">
      <input v-model="search" type="text" placeholder="Recettes, ingrédients ..." class="input input-bordered w-full"/>
    </div>
    <div class="flex relative justify-end items-center">
      <IconSort @click="showActions = !showActions"/>
      <div
          class="absolute z-50 flex flex-col items-start top-9 right-3 border border-gray-300 bg-base-100 text-gray-600 opacity-95 rounded-lg"
          :class="showActions ? '' : 'hidden'"
          v-on-click-outside="() => showActions = false">
        <span class="w-full py-1 px-5 border-b border-gray-500">Trier par</span>
        <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer" @click="sortBy('created_at', 'desc')">Dernières recettes</span>
        <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer" @click="sortBy('kcal')">Kcal</span>
        <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer" @click="sortBy('preparation_time')">Temps de préparation</span>
        <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer"
              @click="sortBy('total_time')">Temps total</span>
        <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer" @click="sortBy('name')">Nom</span>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import IconSort from "@/components/icons/IconSort.vue";
import {vOnClickOutside} from '@vueuse/components'
import {ref, watch} from "vue";
import {useRecipesStore} from "@/stores/recipes";
import {useDebouncedRef} from "@/components/composables/useDebounceRef";

const recipesStore = useRecipesStore();

const showActions = ref(false);

const search = useDebouncedRef(recipesStore.search);

watch(search, (newSearch) => {
  recipesStore.getRecipes(1, null, null, newSearch);
});

const sortBy = (sort: string, direction?: string) => {
  recipesStore.getRecipes(1, sort, direction);
  showActions.value = false;
};
</script>