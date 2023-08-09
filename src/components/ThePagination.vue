<template>
  <div class="pagination flex items-center">
    <router-link :to="prevPageLink" class="pagination__link" :class="{ disabled: isFirstPage }">
      &lt;&lt;
    </router-link>
    <router-link
      v-for="page in pageNumbers"
      :key="page"
      :to="getPageLink(page)"
      class="pagination__link border-r"
      :class="{ active: page === currentPageNumber }"
    >
      {{ page }}
    </router-link>
    <router-link :to="nextPageLink" class="pagination__link" :class="{ disabled: isLastPage }">
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

<style lang="scss" scoped>
.pagination {
  &__link {
    @apply flex items-center justify-center w-[30px] h-[30px];
    &.disabled,
    &.active {
      pointer-events: none;
    }
    &.active {
      @apply text-white bg-base-green;
    }
  }
}
</style>
