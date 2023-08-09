<template>
  <div class="search-input-group">
    <form @submit.prevent="searchUsers">
      <input type="text" v-model="searchQuery" placeholder="Search for users...">
      <button type="submit">search</button>
      <!-- <BaseInput v-model="searchQuery" placeholder="Search for users..." /> -->
      <!-- <BaseButton type="submit">Search</BaseButton> -->
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useSearchStore } from '@/store/searchStore';

// import BaseInput from '@/components/BaseInput.vue';
// import BaseButton from '@/components/BaseButton.vue';

const searchQuery = ref('');
const searchStore = useSearchStore();

const searchUsers = () => {
  searchStore.setQuery(searchQuery.value);
};
</script>