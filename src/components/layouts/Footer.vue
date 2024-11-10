<template>
  <footer class="bg-white flex justify-between border-t h-22 pt-2.5 px-6 fixed bottom-0 w-full pb-safe-bottom">
    <RouterLink :to="{name: 'home'}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </RouterLink>
    <RouterLink :to="{name: 'grocery-lists'}">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M21 9h-1.42l-3.712-6.496-1.736.992L17.277 9H6.723l3.146-5.504-1.737-.992L4.42 9H3a1.001 1.001 0 0 0-.965 1.263l2.799 10.264A2.005 2.005 0 0 0 6.764 22h10.473c.898 0 1.692-.605 1.93-1.475l2.799-10.263A.998.998 0 0 0 21 9zm-3.764 11v1-1H6.764L4.31 11h15.38l-2.454 9z"></path><path d="M9 13h2v5H9zm4 0h2v5h-2z"></path></svg>
    </RouterLink>
    <RouterLink :to="{name: 'login'}">
      <IconUser />
    </RouterLink>
  </footer>
</template>
<script setup lang="ts">
import {RouterLink} from "vue-router";
import IconUser from "@/components/icons/IconUser.vue";
</script>