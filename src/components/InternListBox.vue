<template>
  <div class="intern-list-box flex flex-wrap flex-column justify-center items-center min-h-screen py-6">
    <MainContainer>
      <BaseHeading>
        <h1>User list</h1>
      </BaseHeading>
      <BaseCard>
        <InternList />
      </BaseCard>
      <ThePagination />
    </MainContainer>
  </div>
</template>

<script setup lang="ts">
import MainContainer from '@/components/MainContainer.vue';
import BaseHeading from '@/components/BaseHeading.vue';
import BaseCard from '@/components/BaseCard.vue';
import InternList from '@/components/InternList.vue';
import ThePagination from '@/components/ThePagination.vue';
</script>