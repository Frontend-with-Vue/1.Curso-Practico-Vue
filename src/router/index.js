import { createRouter, createWebHistory } from 'vue-router'
import HomeCash from '@/components/Home-Cash.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeCash
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: import('../views/404NotFound.vue')
    }
  ]
})

export default router
