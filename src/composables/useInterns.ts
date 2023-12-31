import { ref, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

import { usePaginationStore } from '@/store/paginationStore';
import { useSearchStore } from '@/store/searchStore';

import usePagination from '@/composables/usePagination';

import type { Intern, NewIntern } from '@/models/intern';

export default function useInterns() {
  const API_URL = 'https://reqres.in/api/users';

  const { limitPerPage, currentPageNumber } = usePagination();

  const searchStore = useSearchStore();
  const paginationStore = usePaginationStore();

  const route = useRoute();
  const router = useRouter();

  const deletedInterns = ref<number[]>(
    JSON.parse(sessionStorage.getItem('deletedInterns') || '[]')
  );
  const addedInterns = ref<Intern[]>(JSON.parse(sessionStorage.getItem('addedInterns') || '[]'));
  const editedIntern = ref<Intern | null>(
    JSON.parse(sessionStorage.getItem('editedIntern') || '{}')
  );
  const fullInternsList = ref<Intern[]>(
    JSON.parse(sessionStorage.getItem('fullInternsList') || '[]')
  );
  const paginatedInternsList = ref<Intern[]>([]);
  const internToDelete = ref<Intern | null>(null);

  const showModal = ref(false);
  const isLoading = ref(false);

  const avatarDataUrl = ref('');

  const getUsersFromResponse = (response: any) => response.data.data;

  const fetchData = async (): Promise<Intern[]> => {
    isLoading.value = true;

    try {
      const firstPageResponse = await axios.get(`${API_URL}?page=1&per_page=${limitPerPage}`);

      const total_pages = firstPageResponse.data.total_pages;

      const pages = Array.from({ length: total_pages }, (_, i) => i + 1);

      const pagePromises = pages.map((page) =>
        axios.get(`${API_URL}?page=${page}&per_page=${limitPerPage}`)
      );

      const responses = await Promise.all(pagePromises);

      const allUsers = responses.flatMap(getUsersFromResponse);
      isLoading.value = false;

      return allUsers;
    } catch (error) {
      console.error(error);

      isLoading.value = false;
      return [];
    }
  };

  const getInterns = async (): Promise<void> => {
    const allUsers = await fetchData();

    const validUsers = allUsers.filter((user) => !deletedInterns.value.includes(user.id));

    fullInternsList.value = [...validUsers, ...addedInterns.value];

    filterAndPaginateInterns();
  };

  const filterAndPaginateInterns = async (): Promise<void> => {
    const regex = new RegExp(searchStore.query, 'i');

    const filteredInterns = fullInternsList.value.filter(
      (intern) => regex.test(intern.first_name) || regex.test(intern.first_name)
    );

    paginateInterns(filteredInterns);

    if (paginatedInternsList.value.length === 0 && currentPageNumber.value > 1) {
      router.replace({ name: 'internListBox', params: { page: currentPageNumber.value - 1 } });
    }
  };

  const paginateInterns = (internsList: Intern[]): void => {
    const start = (currentPageNumber.value - 1) * limitPerPage;
    const end = start + limitPerPage;

    paginatedInternsList.value = internsList.slice(start, end);

    paginationStore.setTotalPages(Math.ceil(internsList.length / limitPerPage));
  };

  const deleteIntern = (id: number): void => {
    const index = fullInternsList.value.findIndex((intern) => intern.id === id);

    if (index !== -1) {
      fullInternsList.value.splice(index, 1);

      sessionStorage.setItem('fullInternsList', JSON.stringify(fullInternsList.value));

      updateStorageAfterDeletion(id);

      filterAndPaginateInterns();
    }
  };

  const updateStorageAfterDeletion = (id: number) => {
    deletedInterns.value.push(id);

    const addedInternIndex = addedInterns.value.findIndex((intern) => intern.id === id);
    if (addedInternIndex !== -1) {
      addedInterns.value.splice(addedInternIndex, 1);
    }

    sessionStorage.setItem('deletedInterns', JSON.stringify(deletedInterns.value));
    sessionStorage.setItem('addedInterns', JSON.stringify(addedInterns.value));
  };

  const addIntern = (intern: NewIntern): void => {
    const highestId = Math.max(...fullInternsList.value.map((intern) => intern.id));
    const newIntern = { id: highestId + 1, ...intern };

    fullInternsList.value.unshift(newIntern);
    addedInterns.value.unshift(newIntern);

    sessionStorage.setItem('fullInternsList', JSON.stringify(fullInternsList.value));
    sessionStorage.setItem('addedInterns', JSON.stringify(addedInterns.value));

    router.push({ name: 'internListBox', params: { page: 1 } });
    searchStore.setQuery('');
    filterAndPaginateInterns();
  };

  const getInternForEdit = (id: number): Intern | null => {
    const intern = fullInternsList.value.find((intern) => intern.id === id);

    editedIntern.value = intern ? { ...intern } : null;
    avatarDataUrl.value = intern?.avatar ? intern.avatar : '';

    return editedIntern.value;
  };

  const updateIntern = (editedIntern: Intern): void => {
    const index = fullInternsList.value.findIndex((intern) => intern.id === editedIntern.id);
    if (index !== -1) {
      fullInternsList.value.splice(index, 1, editedIntern);

      sessionStorage.setItem('fullInternsList', JSON.stringify(fullInternsList.value));
      sessionStorage.setItem('editedIntern', JSON.stringify(editedIntern));

      filterAndPaginateInterns();
    }
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
      getInternForEdit(Number(route.params.id));
    } else {
      filterAndPaginateInterns();
    }
  });

  return {
    paginatedInternsList,
    internToDelete,
    showModal,
    confirmDelete,
    openDeleteModal,
    addIntern,
    deleteIntern,
    deletedInterns,
    addedInterns,
    editedIntern,
    getInterns,
    filterAndPaginateInterns,
    paginateInterns,
    isLoading,
    getInternForEdit,
    updateIntern,
    avatarDataUrl
  };
}

/*

Opisy metod:

1. `getUsersFromResponse` - ekstrahuje i zwraca listę użytkowników z odpowiedzi serwera.

2. `fetchData` - pobiera dane z serwera. Najpierw wykonuje żądanie do API dla pierwszej strony wiele razy, aż do osiągnięcia łącznej liczby stron. Wszystkie użytkownicy są następnie zbierani i zwracani. 

3. `getInterns` - pobiera całą listę użytkowników za pomocą `fetchData`, usuwa użytkowników, którzy zostali wcześniej usunięci, a następnie dodaje nowo dodanych użytkowników. 

4. `filterAndPaginateInterns` - filtruje listę użytkowników na podstawie zapytania wyszukiwania, a następnie paginuje wyniki. 

5. `paginateInterns` - dzieli pełną listę użytkowników na strony.

6. `deleteIntern` - usuwa użytkownika z pełnej listy użytkowników i aktualizuje sessionStorage.

7. `updateStorageAfterDeletion` - dodaje id usuniętych użytkowników do tablicy "deletedInterns" oraz usuwa ich z tablicy "addedInterns", jeżeli tam się znajdowali. 

8. `addIntern` - dodaje nowego użytkownika na początek listy, aktualizuje sessionStorage, następnie czysci pole wyszukiwania i filtruje wyniki.

9. `getInternForEdit` - znajduje użytkownika o podanym id w pełnej liście użytkowników, aby można go było edytować.

10. `updateIntern` - aktualizuje listę użytkowników po edycji, a następnie aktualizuje sessionStorage.

11. `openDeleteModal` - otwiera moduł potwierdzenia usuwania dla określonego użytkownika.

12. `confirmDelete` - usunie użytkownika i zamknie okno potwierdzenia.

13. `watchEffect` - monitoruje zmiany na pełnej liście użytkowników i wykonuje właściwe działania na podstawie tych zmian. 

*/