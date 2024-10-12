<template>
  <div ref="menu" :class="menuClass"
       class="fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 z-10">
    <ul class="p-6 space-y-4 mt-12">
      <li>
        <div><RouterLink to="/grocery-lists" @click="toggleMenu">Historique des listes de courses</RouterLink></div>
        <div><RouterLink to="/recipes/create">Nouvelle recette</RouterLink></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onBeforeUnmount, computed} from 'vue';
import {RouterLink} from "vue-router";

const menuOpen = ref(false);
const menu = ref<HTMLElement | null>(null);

const menuClass = computed(() => {
  return menuOpen.value ? 'translate-x-0' : '-translate-x-full';
});

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

defineExpose({
  toggleMenu,
});

function handleClickOutside(event: MouseEvent) {
  if (menuOpen.value && menu.value && !menu.value.contains(event.target as Node)) {
    menuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

