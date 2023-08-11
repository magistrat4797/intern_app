<template>
  <router-link v-if="!external" :target="target" :to="to" class="flex items-center btn bg-base-green font-medium px-4 min-h-[40px] rounded hover:bg-dark-green text-white">
      <span class="icon mr-2" v-if="icon">
          <FontAwesomeIcon :icon="icon"/>
      </span>
      <span>
          <slot/>
      </span>
  </router-link>
  <a v-else :href="to" :target="target" class="flex items-center btn bg-base-green font-medium px-4 min-h-[40px] rounded hover:bg-dark-green text-white">
      <span class="icon mr-2" v-if="icon">
          <FontAwesomeIcon :icon="icon"/>
      </span>
      <span>
          <slot/>
      </span>
  </a>
</template>

<script setup lang="ts">
defineProps({
  to: { type: String, required: true },
  icon: String,
  target: String,
  external: Boolean,
});
</script>