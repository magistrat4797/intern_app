<template>
  <label v-if="label" :for="id" :class="['text-dark-gray font-medium mb-1 block', labelClass]">
    {{ label }}
  </label>
  <input :type="type" :placeholder="placeholder" :value="modelValue" @input="updateValue" :required="required" :class="['input w-full h-[40px] px-3 rounded bg-lighter-gray text-dark-gray placeholder:text-base-gray placeholder:font-medium focus:outline-none', inputClass]" />
</template>

<script setup lang="ts">
defineProps({
  id: String,
  label: String,
  placeholder: String,
  labelClass: String,
  inputClass: String,
  required: Boolean,
  modelValue: [String, Number],
  type: {
    type: String,
    default: "text"
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: any) => {
   emit('update:modelValue', event.target.value);
};
</script>