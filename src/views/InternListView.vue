<template>
  <main class="intern-list-view flex flex-wrap flex-col justify-center items-center min-h-screen py-6">
    <MainContainer>
      <BaseHeading>
        <h1>User list</h1>
      </BaseHeading>
      <router-view />
    </MainContainer>
  </main>
</template>

<script setup lang="ts">
import MainContainer from '@/components/MainContainer.vue';
import BaseHeading from '@/components/BaseHeading.vue';
</script>
