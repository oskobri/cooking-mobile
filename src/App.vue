<script setup lang="ts">
import {RouterView} from 'vue-router'
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";

</script>

<template>
  <div class="h-screen flex flex-col">
    <main class="flex-grow pb-16 no-scrollbar">
      <Header></Header>
      <RouterView v-slot="{ Component, route }" class="mx-4 pb-32">
        <transition :name="(route.meta.transition as string) || 'fade'">
          <component :is="Component"/>
        </transition>
      </RouterView>
    </main>
    <Footer/>
  </div>
</template>

