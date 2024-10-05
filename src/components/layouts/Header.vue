<template>
  <header>
    <div class="navbar">
      <div class="navbar-start">
        <RouterLink to="/"><a class="btn btn-ghost text-xl">Cooking</a></RouterLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">

        </ul>
      </div>
      <div class="navbar-end">
        <RouterLink to="/recipes/create"><a class="btn btn-sm btn-outline btn-secondary">Nouvelle recette</a></RouterLink>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>