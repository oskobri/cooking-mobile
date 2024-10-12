<template>
  <RouterLink :to="{name: 'show-grocery-list'}" v-if="selected">
    <button
        class="fixed bottom-0 right-0 z-10 flex justify-between items-center w-full p-4 bg-accent text-white text-xl shadow-2xl duration-300 ease-in-out">
      <span class="text-lg">{{ $t('groceryLists.link_button') }}</span>
      <div class="badge badge-lg badge-outline">{{ selected }}</div>
    </button>
  </RouterLink>
</template>


<script setup lang="ts">
import {useGroceryListsStore} from "@/stores/grocery-lists";
import {computed} from "vue";

const groceryListsStore = useGroceryListsStore();

const selected = computed(() => groceryListsStore.recipes.length);

</script>