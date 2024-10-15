<script setup lang="ts">
import {RouterView} from 'vue-router'
import Header from "@/components/layouts/Header.vue";
</script>

<template>
  <Header></Header>

  <RouterView v-slot="{ Component, route }" class="mx-4">
    <transition :name="(route.meta.transition as string) || 'fade'">
      <component :is="Component"/>
    </transition>
  </RouterView>
</template>

<style scoped>
.slide-left-enter-active, .slide-left-leave-active {
  @apply transition-transform duration-300 ease-in-out;
}

.slide-left-enter {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
