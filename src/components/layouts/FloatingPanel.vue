<template>
  <button @click="showFloatingPanel">Show Floating Panel</button>
  <button @click="closeFloatingPanel(false)">Close Floating Panel</button>
  <van-floating-panel v-model:height="height" :anchors="anchors">
    <div style="text-align: center; padding: 15px">
      <p>Panel Show Height {{ height.toFixed(0) }} px</p>
    </div>
  </van-floating-panel>
</template>

<script lang="ts" setup>

import {ref, watch} from "vue";

const anchors = [
  0,
  Math.round(0.9 * window.innerHeight),
];
const height = ref(anchors[0]);



watch(height, (newHeight) => {
  if (newHeight < Math.round(0.7 * window.innerHeight)) {
    closeFloatingPanel(true);
  }
})


const showFloatingPanel = () => {
  height.value = anchors[1];
}
const closeFloatingPanel = (delay: boolean = false) => {
  if(delay) {
    setTimeout(() => {
      height.value = anchors[0];
    }, 10);
  } else {
    height.value = anchors[0];
  }
}
</script>