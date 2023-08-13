<template>
  <button :class="linkClasses" :type="type">
    <span class="icon mr-4" v-if="icon">
      <FontAwesomeIcon :icon="icon" />
    </span>
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
const linkClasses =
  'flex items-center justify-center bg-base-green px-4 min-h-[40px] rounded hover:bg-dark-green text-white';

defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  },
  icon: String
});
</script>
