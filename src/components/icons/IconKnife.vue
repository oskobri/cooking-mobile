<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" :fill
       style="transform: rotate(270deg);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">
    <path
        d="M19.66 3.6a3 3 0 0 0-4.24 0l-.71.71-7.07 7.07 2.12 2.12-6.36 6.36 1.41 1.42L19.66 6.43c1.1-1.1 1.1-1.73.71-2.12z"></path>
  </svg>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  fill?: string
}>(), {
  fill: 'rgb(156 163 175)',
});
</script>