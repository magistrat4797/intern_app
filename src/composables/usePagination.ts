import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePaginationStore } from '@/store/pagination';

export default function usePagination() {

  const route = useRoute();
  const paginationStore = usePaginationStore();

  const currentPageNumber = computed(() => Number(route.params.page) || 1);
  const pageNumbers = computed(() => [...Array(paginationStore.totalPages).keys()].map(page => page + 1));

  const isFirstPage = computed(() => currentPageNumber.value === 1);
  const isLastPage = computed(() => currentPageNumber.value === paginationStore.totalPages);

  const getPrevPageNumber = () => (currentPageNumber.value > 2 ? currentPageNumber.value - 1 : 1);
  const getNextPageNumber = () => (currentPageNumber.value + 1 > paginationStore.totalPages ? paginationStore.totalPages : currentPageNumber.value + 1);

  const getPageLink = (pageNumber: number) => (pageNumber > 1 ? '/page-' + pageNumber : '/');
  const getNavigationPageLink = (pageNumber: number) => (pageNumber === 1 ? '/' : '/page-' + pageNumber);

  const prevPageLink = computed(() => getNavigationPageLink(getPrevPageNumber()));
  const nextPageLink = computed(() => getPageLink(getNextPageNumber()));

  return {
    currentPageNumber,
    pageNumbers,
    isFirstPage,
    isLastPage,
    prevPageLink,
    nextPageLink,
    getPageLink
  }
}