<template>
  <div class="flex items-center bg-gray-100 rounded-full p-2 px-4 text-sm">
    <button
        @click="decrement"
        :disabled="quantity <= 1"
        :class="{ 'text-gray-400': quantity <= 1 }">-</button>
    <span class="mx-6">{{ quantity }}</span>
    <button @click="increment">+</button>
  </div>
</template>

<script lang="ts" setup>

const quantity = defineModel<number>('modelValue', { required: true });

const increment = () => quantity.value++;

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
}
</script>