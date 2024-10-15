<template>
  <div class="flex flex-wrap gap-4" ref="scrollComponent">
    <GroceryListCard v-for="groceryList in groceryListsStore.groceryLists"
                     :key="groceryList.id"
                     :grocery-list="groceryList"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {useGroceryListsStore} from "@/stores/grocery-lists";
import GroceryListCard from "@/components/grocery-lists/GroceryListCard.vue";

const groceryListsStore = useGroceryListsStore();

const scrollComponent = ref<HTMLElement|null>(null);
const waitForGroceryLists = ref(false);

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);

  await groceryListsStore.getGroceryLists();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
})

async function handleScroll() {
  let element = scrollComponent.value;
  if (!waitForGroceryLists.value && element && element.getBoundingClientRect().bottom < (window.innerHeight + 50)) {
    waitForGroceryLists.value = true;
    await groceryListsStore.getGroceryLists(groceryListsStore.currentPage + 1);
    waitForGroceryLists.value = false;
  }
}

</script>

<style scoped></style>