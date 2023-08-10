import { createRouter, createWebHistory } from 'vue-router';
import InternListView from '@/views/InternListView.vue';
import InternListBox from '@/components/InternListBox.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: InternListView,
      children: [
        {
          path: '',
          name: 'home',
          component: InternListBox
        },
        
        {
          path: 'page-:page',
          name: 'internListBox',
          component: InternListBox,
        }
      ]
    }
  ]
});

export default router;
