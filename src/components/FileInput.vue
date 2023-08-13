<template>
  <label
    class="file-input inline-flex justify-center px-4 items-center min-h-[45px] rounded border transition ease-in-out duration-200 text-dark-gray hover:bg-base-green hover:border-base-green hover:text-white border-base-gray cursor-pointer"
  >
    <span class="icon mr-2" v-if="icon">
      <FontAwesomeIcon :icon="icon" />
    </span>
    <span>{{ title }}</span>
    <input class="hidden" type="file" @change="updateValue" />
  </label>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  icon: String
});

const emit = defineEmits(['change']);

const updateValue = (event: any) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    emit('change', reader.result);
  };
  reader.readAsDataURL(file);
};
</script>
