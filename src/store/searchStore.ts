import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: ''
  }),
  actions: {
    setQuery(query: string) {
      this.query = query;
    }
  }
});
