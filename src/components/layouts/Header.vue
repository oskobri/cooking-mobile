<template>
  <header>
    <div class="navbar bg-base-100">
      <div class="navbar-start">

      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/recipes/create">Ajout de recette</RouterLink></li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>