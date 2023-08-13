<template>
  <div class="flex items-center justify-center">
    <span class="spinner" />
  </div>
</template>

<style lang="scss">
@keyframes spinner {
  to {
    transform: rotate(1turn);
  }
}

$spinner-size: 25px;

.spinner {
  width: $spinner-size;
  height: $spinner-size;
  border-radius: 50%;
  background: conic-gradient(#fff 10%, #4e575f);
  mask-image: radial-gradient(farthest-side, #0000 calc(100% - 4px), #fff 0);
  animation: spinner 0.7s infinite linear;
}
</style>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '#000000'
  },
  size: {
    type: [String, Number],
    default: '30'
  }
});
</script>
