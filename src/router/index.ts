import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import InternList from '@/components/InternList.vue';

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
      name: 'internList',
      component: InternList,
      props: (route) => ({ page: Number(route.params.page) })
    }
  ]
});

export default router;
