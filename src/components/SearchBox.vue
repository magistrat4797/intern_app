<template>
  <div class="search-box">
    <BaseForm @submit.prevent="searchUsers">
      <InputGroup>
        <BaseInput
          inputClass="pr-[40px]"
          type="text"
          v-model="searchQuery"
          placeholder="Search for users..."
        />
        <button class="absolute top-0 right-0 text-base-gray hover:text-base-green w-[40px] h-full">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </button>
      </InputGroup>
    </BaseForm>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useSearchStore } from '@/store/searchStore';
import { useRouter } from 'vue-router';

import InputGroup from '@/components/InputGroup.vue';
import BaseForm from '@/components/BaseForm.vue';
import BaseInput from '@/components/BaseInput.vue';

const router = useRouter();
const searchQuery = ref('');
const searchStore = useSearchStore();

const searchUsers = async () => {
  await router.push({ name: 'internListBox', params: { page: 1 } });
  searchStore.setQuery(searchQuery.value);
};
</script>
