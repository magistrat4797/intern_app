<template>
  <BaseCard class="intern-list-box">
    <div class="py-3 sm:py-6">
      <div class="flex flex-col sm:flex-row justify-between pb-4 mb-2 sm:pb-8 sm:mb-4 border-b">
        <SearchBox class="grow sm:mr-[20px] max-w-[600px]" />
        <div class="flex mt-4 sm:mt-0">
          <BaseLink to="/add-intern" title="Add user" icon="fa-solid fa-plus" class="rounded-full"
            >Add User</BaseLink
          >
        </div>
      </div>
      <InternList />
    </div>
  </BaseCard>
  <ThePagination />
</template>

<script setup lang="ts">
import BaseLink from '@/components/BaseLink.vue';
import BaseCard from '@/components/BaseCard.vue';
import InternList from '@/components/InternList.vue';
import SearchBox from '@/components/SearchBox.vue';
import ThePagination from '@/components/ThePagination.vue';
</script>
