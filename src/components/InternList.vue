<template>
  <table class="intern-list-table table table-auto w-full text-left">
    <thead>
      <tr class="text-base-gray">
        <th></th>
        <th>Full Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="intern in interns" :key="intern.id" class="odd:bg-light-gray">
        <td class="rounded-l w-[60px] md:w-[130px]">
          <span class="block avatar overflow-hidden rounded-full w-[40px] h-[40px] md:w-[45px] md:h-[45px] bg-gray-200">
            <img :src="intern.image" />
          </span>
        </td>
        <td>{{ intern.firstName }} {{ intern.lastName }}</td>
        <td class="rounded-r w-[70px] md:w-[130px]">btn</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
  .intern-list-table {
    tr {
      th,
      td {
        @apply p-2 md:p-[10px];
      }
      th {
        @apply h-[55px];
      }
      td {
        @apply h-[65px];
      }
    }
  }
</style>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import axios from 'axios';
import { useRoute } from 'vue-router';

import { usePaginationStore } from '@/store/pagination';

import type { Intern } from '@/models/intern';

const route = useRoute();
const paginationStore = usePaginationStore();
const interns = ref<Intern[]>([]);

let currentPage = ref(route.params.page ? Number(route.params.page) : 1);

const getInterns = async (page: number) => {
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
};

onMounted(() => getInterns(currentPage.value));
watch(
  () => route.params.page,
  (newPage) => getInterns(Number(newPage))
);
</script>
