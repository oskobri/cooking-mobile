<template>
  <div class="flex justify-between">
    {{ $t('recipes.preparation_time') }}
    <span class="font-bold">{{ $tc('common.minute', recipe.preparationTime, {count: recipe.preparationTime}) }}</span>
  </div>
  <div class="flex justify-between">
    {{ $t('recipes.total_time') }}
    <span class="font-bold">{{ $tc('common.minute', recipe.totalTime, {count: recipe.totalTime}) }}</span>
  </div>
  <div class="flex justify-between">
    {{ $t('recipes.per_serving') }}
    <span class="font-bold">{{ recipe.kcal }} {{ $t('recipes.kcal') }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps(['recipe']);
</script>