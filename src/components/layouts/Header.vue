<template>
  <header :class="headerClasses">
    <div class="navbar p-0">
      <div class="navbar-start">
        <RouterLink to="/" class="z-20"><a class="text-xl font-bold">Papille</a></RouterLink>
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
import {onMounted, ref} from "vue";

const headerClasses = ref('px-4');

const isIos = () => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

onMounted(() => {
  if (isIos()) {
    headerClasses.value += ' pt-10';
  }
});
</script>
