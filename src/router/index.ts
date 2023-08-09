import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import InternListBox from '@/components/InternListBox.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/page-:page',
      name: 'internListBox',
      component: InternListBox,
      props: (route) => ({ page: Number(route.params.page) })
    }
  ]
});

export default router;
