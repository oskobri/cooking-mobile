<template>
  <div class="text-secondary font-bold">
    <button
        @click="decrement"
        class="btn btn-square btn-accent text-white"
        :disabled="quantity <= 1"
    >
      -
    </button>
    <span class="mx-6 text-lg">{{ quantity }} personne{{ quantity > 1 ? 's' : '' }}</span>
    <button
        @click="increment"
        class="btn btn-square btn-accent text-white"
    >
      +
    </button>
  </div>
</template>

<script lang="ts" setup>

import {ref, watch} from "vue";

const emit = defineEmits(['update'])

const props = withDefaults(defineProps<{
  initialQuantity: number
}>(), {
  initialQuantity: 1,
});

const quantity = ref(props.initialQuantity);

watch(quantity, (newValue) => {
  emit('update', newValue);
});

function increment() {
  quantity.value++;
}

function decrement() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}
</script>