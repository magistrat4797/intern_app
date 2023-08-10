<template>
  <a :href="href" :icon="icon" class="flex items-center btn bg-base-green font-medium px-4 min-h-[40px] rounded-full hover:bg-dark-green text-white">
    <span class="icon mr-2" v-if="icon">
      <FontAwesomeIcon :icon="icon" />
    </span>
    <span>
      <slot/>
    </span>
  </a>
</template>

<script setup lang="ts">
defineProps({
  href: { type: String, required: true },
  icon: String,
  target: String,
});
</script>