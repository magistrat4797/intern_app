import { createRouter, createWebHistory } from 'vue-router';
import InternListView from '@/views/InternListView.vue';
import AddInternView from '@/views/AddInternView.vue';

import InternListBox from '@/components/InternListBox.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/page-1',
      component: InternListView,
      children: [
        {
          path: '/page-:page',
          name: 'internListBox',
          component: InternListBox,
        },
      ]
    },
    {
      path: '/add-intern',
      component: AddInternView,
    },
  ]
});

export default router;