<template>
  <div class="intern-list">
    <div v-if="isLoading">
      <TheSpinner />
    </div>
    <div v-else-if="!paginatedInternsList.length">
      <p class="text-red-600 text-center sm:text-lg">User not found!</p>
    </div>
    <div v-else>
      <table class="intern-list__table table table-auto w-full text-left">
        <thead>
          <tr class="text-dark-gray">
            <th></th>
            <th>Full Name</th>
            <th class="text-center sm:text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="intern in paginatedInternsList" :key="intern.id" class="odd:bg-lighter-gray">
            <td class="rounded-l w-[60px] sm:w-[130px]">
              <span class="block avatar overflow-hidden rounded-full w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] bg-gray-200">
                <img v-if="intern.avatar" :src="intern.avatar" />
                <img v-else src="@/assets/images/default-avatar.png">
              </span>
            </td>
            <td>{{ intern.first_name }} {{ intern.last_name }}</td>
            <td class="rounded-r w-[70px] sm:w-[130px]">
              <span class="flex items-center justify-center sm:justify-start">
                <RouterLink :to="`/edit-intern/${intern.id}`" class="mr-2 sm:mr-5 text-light-gray hover:text-base-green">
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                </RouterLink>
                <button type="button" @click="openDeleteModal(intern)" class="text-light-gray hover:text-base-green">
                  <FontAwesomeIcon icon="fa-solid fa-trash" />
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <BaseModal 
       v-model="showModal"
       title="Delete the intern"
       maxWidth="450"
       @confirm="confirmDelete"
     >
       <template #body>
        <p class="text-md sm:text-lg">Are you sure you want to delete <span class="font-bold">{{ internToDelete?.first_name }} {{ internToDelete?.last_name }}</span>?</p>
       </template>
       <template #actions>
          <BaseButton class="mr-3" @click="showModal = false">No</BaseButton>
          <BaseButton class="bg-red-500 hover:bg-red-800" @click="confirmDelete">Yes</BaseButton>
       </template>
     </BaseModal>
  </div>
</template>

<script setup lang="ts">
import useInterns from '@/composables/useInterns';

import BaseModal from '@/components/BaseModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import TheSpinner from '@/components/TheSpinner.vue';

const { paginatedInternsList, internToDelete, showModal, confirmDelete, openDeleteModal, isLoading } = useInterns();

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