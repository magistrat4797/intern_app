<template>
  <div>
    <router-link
      :to="prevPageLink"
      class="page-link prev"
      :class="{ disabled: isFirstPage }"
    >
      &lt;&lt;
    </router-link>
    <router-link 
      v-for="page in pageNumbers"
      :key="page"
      :to="getPageLink(page)"
      class="page-link"
      :class="{ active: page === currentPageNumber }"
    >
      {{ page }}
    </router-link>
    <router-link 
      :to="nextPageLink"
      class="page-link next"
      :class="{ disabled: isLastPage }" 
    >
      &gt;&gt;
    </router-link>
  </div>
</template>

<script setup lang="ts">
import usePagination from '@/composables/usePagination';

const {
  currentPageNumber,
  pageNumbers,
  isFirstPage,
  isLastPage,
  prevPageLink,
  nextPageLink,
  getPageLink
} = usePagination();
</script>

<style lang="css" scoped>
.active {
  color: red;
}
.page-link.disabled, .page-link.active {
  pointer-events: none;
  color: #ccc;
}
</style>