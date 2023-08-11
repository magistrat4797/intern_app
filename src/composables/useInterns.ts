import { computed, ref, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

import { usePaginationStore } from '@/store/paginationStore';
import { useSearchStore } from '@/store/searchStore';

import type { Intern, NewIntern } from '@/models/intern';

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

  const currentPage = computed<number>(() => Number(route.params.page || 1));

  const loadInternsFromStorage = () => {
    const deletedInterns = ref<number[]>(JSON.parse(sessionStorage.getItem('deletedInterns') || '[]'));
    const addedInterns = ref<Intern[]>(JSON.parse(sessionStorage.getItem('addedInterns') || '[]'));

    fullInternsList.value = JSON.parse(sessionStorage.getItem('fullInternsList') || '[]');
    return { deletedInterns, addedInterns };
  };

  const { deletedInterns, addedInterns } = loadInternsFromStorage();

  const fetchData = async (): Promise<Intern[]> => {
    const response = await axios.get('https://dummyjson.com/users?limit=0');
    return response.data.users;
  };
  
  const getInterns = async (): Promise<void> => {
    const allUsers = await fetchData();
      
    const validUsers = allUsers.filter(user => !deletedInterns.value.includes(user.id));
      
    fullInternsList.value = [...validUsers, ...addedInterns.value];
    
    filterAndPaginateInterns();
};

  const filterAndPaginateInterns = async (): Promise<void> => {
    const regex = new RegExp(searchStore.query, 'i');
    
    const filteredInterns = fullInternsList.value.filter(
      intern => regex.test(intern.firstName) || regex.test(intern.lastName)
    );

    paginateInterns(filteredInterns);

    if (paginatedInternsList.value.length === 0 && currentPage.value > 1) {
      router.replace({ name: 'internListBox', params: { page: currentPage.value - 1 } });
    }
  };

  const paginateInterns = (internsList: Intern[]): void => {
    const start = (currentPage.value - 1) * LIMIT_PER_PAGE;
    const end = start + LIMIT_PER_PAGE;
    
    paginatedInternsList.value = internsList.slice(start, end);
    
    paginationStore.setTotalPages(Math.ceil(internsList.length / LIMIT_PER_PAGE));
  };

  // Now just use fullInternsList for all other operations
  const deleteIntern = (id: number): void => {
    const index = fullInternsList.value.findIndex(intern => intern.id === id);
    
    if (index !== -1) {
      fullInternsList.value.splice(index, 1);
      
      sessionStorage.setItem('fullInternsList', JSON.stringify(fullInternsList.value));

      updateStorageAfterDeletion(id);
      
      filterAndPaginateInterns();
    }
  };
  
  const updateStorageAfterDeletion = (id: number) => {
    deletedInterns.value.push(id);
    
    const addedInternIndex = addedInterns.value.findIndex(intern => intern.id === id);
    if (addedInternIndex !== -1) {
      addedInterns.value.splice(addedInternIndex, 1);
    }
    
    sessionStorage.setItem('deletedInterns', JSON.stringify(deletedInterns.value));
    sessionStorage.setItem('addedInterns', JSON.stringify(addedInterns.value));
  };
  
  const addIntern = (intern: NewIntern): void => {
    const highestId = Math.max(...fullInternsList.value.map(intern => intern.id));
    const newIntern = { id: highestId + 1, ...intern };
    
    fullInternsList.value.unshift(newIntern);
    addedInterns.value.unshift(newIntern);
    
    sessionStorage.setItem('fullInternsList', JSON.stringify(fullInternsList.value));
    sessionStorage.setItem('addedInterns', JSON.stringify(addedInterns.value));

    filterAndPaginateInterns();
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

  watchEffect(async () => {
    if (fullInternsList.value.length === 0) {
      await getInterns();
    } else {
      filterAndPaginateInterns();
    }
  });

  return { paginatedInternsList, internToDelete, showModal, confirmDelete, openDeleteModal, addIntern, deleteIntern, deletedInterns, addedInterns, getInterns, filterAndPaginateInterns, paginateInterns };
}