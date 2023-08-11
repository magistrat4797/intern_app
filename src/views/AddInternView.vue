<template>
  <div class="intern-list-view flex flex-wrap flex-col justify-center items-center min-h-screen py-6">
    <MainContainer>
      <BaseHeading>
        <h1>Add new intern</h1>
      </BaseHeading>
      <AddInternBox />
    </MainContainer>
  </div>
</template>

<script setup lang="ts">
import MainContainer from '@/components/MainContainer.vue';
import BaseHeading from '@/components/BaseHeading.vue';
import AddInternBox from '@/components/AddInternBox.vue';
</script>
