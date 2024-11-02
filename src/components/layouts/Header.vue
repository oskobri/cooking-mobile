<template>
  <header :class="headerClasses">
    <div class="navbar p-0">
      <div class="navbar-start">
        <div v-if="canGoBack" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
            <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
          </svg>
        </div>
      </div>
      <div class="navbar-center">
        <ul class="menu menu-horizontal px-1">
          <li>
            <RouterLink to="/" class="z-20"><a class="text-xl font-bold">Papille</a></RouterLink>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {RouterLink, useRoute} from "vue-router";
import {computed, type ComputedRef, onMounted, ref, watch} from "vue";
import router from "@/router";

const headerClasses = ref('px-4');
const canGoBack = ref(false);
const route = useRoute();

const isIos = () => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

watch(route, () => {
  const routesWithBackButton = ['show-recipe', 'show-grocery-list'];
  canGoBack.value = routesWithBackButton.includes(String(route.name)) && window.history.length > 1;
});

onMounted(() => {
  if (isIos()) {
    headerClasses.value += ' pt-10';
  }
});

const goBack = () => {
  router.back();
};

</script>
