import { defineStore } from 'pinia';

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    totalPages: 0,
  }),
  actions: {
    setTotalPages(pages: number) {
      this.totalPages = pages;
    },
  },
});