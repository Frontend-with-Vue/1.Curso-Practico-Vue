import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ()=>import('../components/Header.vue'),
      children: [
        {
          path: '',
          name: 'home',
          alias: ['home', 'main'],
          component: ()=> import('../components/Home-Cash.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/About.vue')
        },
        {
          path: 'chat',
          name: 'chat',
          component: ()=> import('../views/Chat.vue'),
          children: [
            {
              path: '',
              components: {
                default: () => import('../views/ChatContent.vue'),
                sidebar: () => import('../views/ChatSideBar.vue')
              }
            }
          ]
        },
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
