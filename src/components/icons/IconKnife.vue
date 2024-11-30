<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width :height  :fill
       style="transform: rotate(180deg);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);">
    <path
        d="M19.66 3.6a3 3 0 0 0-4.24 0l-.71.71-7.07 7.07 2.12 2.12-6.36 6.36 1.41 1.42L19.66 6.43c1.1-1.1 1.1-1.73.71-2.12z"></path>
  </svg>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  fill?: string,
  height?: number,
  width?: number,
}>(), {
  fill: 'rgb(156 163 175)',
  height: 24,
  width: 24,
});
</script>