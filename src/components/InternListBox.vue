<template>
  <div class="intern-list-box flex flex-wrap flex-column justify-center items-center min-h-screen py-6">
    <MainContainer>
      <BaseHeading>
        <h1>User list</h1>
      </BaseHeading>
      <BaseCard>
        <div class="flex flex-col-reverse sm:flex-row justify-between pb-4 mb-2 sm:pb-8 sm:mb-4 border-b">
          <SearchBox class="grow mt-4 sm:mt-0 sm:mr-[20px] max-w-[600px]" />
          <div class="flex">
            <BaseLink :href="'https://www.google.com/'" title="Add user" :icon="'fa-solid fa-plus'">Add User</BaseLink>
          </div>
        </div>
        <InternList />
      </BaseCard>
      <ThePagination />
    </MainContainer>
  </div>
</template>

<script setup lang="ts">
import MainContainer from '@/components/MainContainer.vue';
import BaseHeading from '@/components/BaseHeading.vue';
import BaseLink from '@/components/BaseLink.vue';
import BaseCard from '@/components/BaseCard.vue';
import InternList from '@/components/InternList.vue';
import SearchBox from '@/components/SearchBox.vue';
import ThePagination from '@/components/ThePagination.vue';
</script>