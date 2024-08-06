import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'header',
      component: ()=>import('../components/Header.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: ()=> import('../components/Home-Cash.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/About.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: import('../views/404NotFound.vue')
    }
  ]
})

export default router
