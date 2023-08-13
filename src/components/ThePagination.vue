<template>
  <div class="pagination flex flex-wrap items-center justify-center sm:justify-normal mt-5">
    <router-link
      :to="prevPageLink"
      class="pagination__link prev"
      :class="{ disabled: isFirstPage }"
    >
      &laquo;
    </router-link>
    <router-link
      v-for="page in pageNumbers"
      :key="page"
      :to="getPageLink(page)"
      class="pagination__link page-link"
      :class="{ active: page === currentPageNumber }"
    >
      {{ page }}
    </router-link>
    <router-link :to="nextPageLink" class="pagination__link next" :class="{ disabled: isLastPage }">
      &raquo;
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
    @apply flex items-center justify-center border border-y-2 h-10 px-3 text-base-green;
    &.disabled,
    &.active {
      @apply pointer-events-none;
    }
    &.disabled {
      @apply text-dark-gray;
    }
    &.active,
    &:hover {
      @apply text-white bg-base-green border-base-green;
    }
    &.prev {
      @apply rounded-l-md;
    }
    &.next {
      @apply rounded-r-md;
    }
    &.page-link {
      &:not(.active) {
        @apply hidden sm:flex;
      }
    }
  }
}
</style>
