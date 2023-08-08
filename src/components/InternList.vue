<template>
  <div>
    <div v-for="intern in interns" :key="intern.id">
      <img :src="intern.image" />
      <p>{{ intern.firstName }} {{ intern.lastName }}</p>
    </div>
    <ThePagination />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import axios from 'axios';
import { useRoute } from 'vue-router';

import ThePagination from '@/components/ThePagination.vue';
import { usePaginationStore } from '@/store/pagination';

import type { Intern } from '@/models/intern';

const route = useRoute();
const paginationStore = usePaginationStore();
const interns = ref<Intern[]>([]);

let currentPage = ref(route.params.page ? Number(route.params.page) : 1);

async function getInterns(page: number) {
  const limit = 8;
  const skip = limit * (page - 1);
  const API_URL = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

  try {
    const response = await axios.get(API_URL);

    if (response.status >= 200 && response.status < 300) {
      const users = response.data.users as Intern[];
      paginationStore.setTotalPages(Math.ceil(response.data.total / limit));
      interns.value = users;
    } else {
      console.error('HTTP error:', response.status);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

onMounted(() => getInterns(currentPage.value));
watch(
  () => route.params.page,
  (newPage) => getInterns(Number(newPage))
);
</script>
