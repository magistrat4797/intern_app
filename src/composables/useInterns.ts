import { computed, ref, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

import { usePaginationStore } from '@/store/paginationStore';
import { useSearchStore } from '@/store/searchStore';

import type { Intern } from '@/models/intern';

export default function useInterns() {
  const LIMIT_PER_PAGE: number = 8;

  const searchStore = useSearchStore();
  const route = useRoute();
  const router = useRouter();
  const paginationStore = usePaginationStore();

  const fullInternsList = ref<Intern[]>([]);
  const paginatedInternsList = ref<Intern[]>([]);
  const internToDelete = ref<Intern | null>(null);
  const showModal = ref<boolean>(false);

  const deletedInterns = ref<number[]>(JSON.parse(localStorage.getItem('deletedInterns') || '[]'));

  const currentPage = computed<number>(() => Number(route.params.page || 1));

  const getInterns = async (): Promise<void> => {
      try {
          const response = await axios.get(`https://dummyjson.com/users?limit=0`);
          const allUsers: Intern[] = response.data.users;
          fullInternsList.value = allUsers.filter(
              (intern: Intern) => !deletedInterns.value.includes(intern.id)
          );
          filterAndPaginateInterns();
      } catch (error) {
          console.error('Network error:', error);
      }
  };

  const filterAndPaginateInterns = async (): Promise<void> => {
      const regex = new RegExp(searchStore.query, 'i');
      const filteredInterns = fullInternsList.value.filter((intern: Intern) =>
          regex.test(intern.firstName) || regex.test(intern.lastName)
      );
      paginateInterns(filteredInterns);
      if (paginatedInternsList.value.length === 0 && currentPage.value > 1) {
          router.replace({ name: 'internListBox', params: { page: currentPage.value - 1 } });
      }
  };

  const paginateInterns = (internsList: Intern[]): void => {
      const start: number = (currentPage.value - 1) * LIMIT_PER_PAGE;
      const end: number = start + LIMIT_PER_PAGE;
      paginatedInternsList.value = internsList.slice(start, end);
      paginationStore.setTotalPages(Math.ceil(internsList.length / LIMIT_PER_PAGE));
  };

  const openDeleteModal = (intern: Intern): void => {
      internToDelete.value = intern;
      showModal.value = true;
  };

  const confirmDelete = async (): Promise<void> => {
      if (internToDelete.value) {
          await deleteIntern(internToDelete.value.id);
          showModal.value = false;
          internToDelete.value = null;
      }
  };

  const deleteIntern = async (id: number): Promise<void> => {
      try {
          const response = await axios.delete(`https://dummyjson.com/users/${id}`);
          if (response.status >= 200 && response.status < 300 && response.data.isDeleted) {
              deletedInterns.value.push(id);
              localStorage.setItem('deletedInterns', JSON.stringify(deletedInterns.value));
              await getInterns();
              if (paginatedInternsList.value.length === 0) {
                  searchStore.query = '';
              }
          } else {
              console.error('HTTP error:', response.status);
          }
      } catch (error) {
          console.error('Network error:', error);
      }
  };

  watchEffect(async () => {
    if (fullInternsList.value.length === 0) {
      await getInterns();
    } else {
      filterAndPaginateInterns();
    }
  });

  return { paginatedInternsList, internToDelete, showModal, confirmDelete, openDeleteModal };
}