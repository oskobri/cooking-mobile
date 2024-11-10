<template>
  <div class="collapse overflow-visible relative bg-base-200">
    <input type="checkbox">
    <span class="collapse-title text-xl font-medium">
        {{ groceryList.name }}
      </span>
    <span class="px-5 pb-4 pt-3 z-10 absolute right-0 top-0 text-xl font-medium cursor-pointer"
          @click="showActions = !showActions">...</span>
    <RouterLink :to="{name: 'show-grocery-list', params:{ id: groceryList.id }}">
      <button class="w-full rounded-b-lg bg-accent text-xl text-white p-2">Aller voir la liste</button>
    </RouterLink>
    <div class="collapse-content flex flex-wrap gap-4">
      <RecipeCard v-for="recipe in groceryList.recipes"
                  :key="groceryList.id"
                  :recipe="recipe"/>
    </div>

    <div class="absolute z-50 flex flex-col items-start top-9 right-3 border border-gray-300 bg-base-100 text-gray-600 opacity-95 rounded-lg"
         :class="showActions ? '' : 'hidden'"
         v-on-click-outside="() => showActions = false">
      <span class="w-full py-3 px-5 border-b border-gray-500 cursor-pointer" @click="updateGroceryList">Modifier le titre</span>
      <span class="w-full py-3 px-5 text-red-400 cursor-pointer" @click="deleteGroceryList">Supprimer</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {GroceryList, InputUpdateGroceryList} from "@/services/grocery-lists/types.d";
import RecipeCard from "@/components/recipes/RecipeCard.vue";
import {ref} from "vue";
import {vOnClickOutside} from '@vueuse/components'
import {useGroceryListsStore} from "@/stores/grocery-lists";

const groceryListsStore = useGroceryListsStore();

const props = defineProps<{
  groceryList: GroceryList
}>();

const showActions = ref(false);

const updateGroceryList = () => {
  const title = prompt('Nouveau titre');

  if(title) {
    const input: InputUpdateGroceryList = {
      name: title
    };
    groceryListsStore.updateGroceryList(props.groceryList.id, input);
  }
    showActions.value = false;
}

const deleteGroceryList = () => {
  if (confirm('Voulez vous vraiment supprimer la liste de course \n' + props.groceryList.name)) {
    groceryListsStore.deleteGroceryList(props.groceryList.id);
  }
}

</script>
