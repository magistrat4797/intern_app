<template>
  <div class="intern-list">
    <table class="intern-list__table table table-auto w-full text-left">
      <thead>
        <tr class="text-dark-gray">
          <th></th>
          <th>Full Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="intern in interns" :key="intern.id" class="odd:bg-lighter-gray">
          <td class="rounded-l w-[60px] sm:w-[130px]">
            <span class="block avatar overflow-hidden rounded-full w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] bg-gray-200">
              <img :src="intern.image" />
            </span>
          </td>
          <td>{{ intern.firstName }} {{ intern.lastName }}</td>
          <td class="rounded-r w-[70px] sm:w-[130px]">btn</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import axios from 'axios';
import { useRoute } from 'vue-router';

import { usePaginationStore } from '@/store/paginationStore';
import { useSearchStore } from '@/store/searchStore';

import type { Intern } from '@/models/intern';

const searchStore = useSearchStore();
const route = useRoute();
const paginationStore = usePaginationStore();
const interns = ref<Intern[]>([]);

const LIMIT_PER_PAGE = 8;

let currentPage = ref(route.params.page ? Number(route.params.page) : 1);

const getInterns = async (page: number, limit: number) => {
  const skip = limit * (page - 1);
  let API_URL;
  if (searchStore.query) {
    API_URL = `https://dummyjson.com/users/search?q=${searchStore.query}&limit=${limit}&skip=${skip}`;
  } else {
    API_URL = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
  }

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

watch(
  [() => searchStore.query, () => route.params.page],
  () => {
    currentPage.value = route.params.page ? Number(route.params.page) : 1;
    getInterns(currentPage.value, LIMIT_PER_PAGE);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
  .intern-list {
    &__table {
      tr {
        th,
        td {
          @apply p-2 sm:p-[10px];
        }
        th {
          @apply h-[50px] sm:h-[55px];
        }
        td {
          @apply text-sm sm:text-base h-[60px] sm:h-[65px];
        }
      }
    }
  }
</style>