<template>
  <header>
    <div class="navbar">
      <div class="navbar-start">
        <button @click.stop="toggleMenu" class="block z-20">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <BurgerMenu ref="burgerMenu" />

        <RouterLink to="/" class="z-20"><a class="btn btn-ghost text-xl">Cooking</a></RouterLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">

        </ul>
      </div>
      <div class="navbar-end">
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
import BurgerMenu from "@/components/layouts/BurgerMenu.vue";
import {ref} from "vue";

const burgerMenu = ref<InstanceType<typeof BurgerMenu> | null>(null);

const toggleMenu = () => {
    burgerMenu.value?.toggleMenu();
};
</script>
