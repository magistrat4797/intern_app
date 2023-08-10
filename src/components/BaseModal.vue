<template>
  <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center" v-if="modelValue">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div class="modal-container px-4 mx-auto z-50">

        <div class="modal-content relative py-3 sm:py-4  text-left bg-white rounded shadow-lg" :style="{maxWidth: maxWidth + 'px'}">
          <div class="modal-title px-4 pb-3 mb-3 sm:px-5 sm:pb-4 sm:mb-4 border-b" v-if="title">
            <p class="text-lg sm:text-xl font-bold">{{ title }}</p>
          </div>
          
          <button type="button" class="modal-close absolute right-0 -top-[35px] cursor-pointer" @click="closeModal">
            <span class="inline-flex justify-center items-center text-2xl h-[35px] text-white hover:text-base-green">
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </span>
          </button>
          <div class="modal-body px-4 sm:px-5">
            <slot name="body"/>
          </div>
            
          <div class="flex justify-end pt-4 px-4 sm:px-5" v-if="slots.actions">
            <slot name="actions"/>
          </div>
        </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots();

defineProps({
  modelValue: Boolean,
  title: String,
  maxWidth: {
    type: [String, Number],
    default: '550'
  }
});

const emit = defineEmits(['update:modelValue']);
const closeModal = () => emit('update:modelValue', false);
</script>