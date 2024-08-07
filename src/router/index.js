import { createRouter, createWebHistory } from 'vue-router'

const stage = import.meta.env.VITE_STAGE;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
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
          component: ()=> import('../views/Chat.vue'),
          children: [
            {
              path: '',
              name: 'chat',
              components: {
                default: () => import('../views/ChatContent.vue'),
                sidebar: () => import('../views/ChatSideBar.vue')
              }
            }
          ]
        },
        {
          path: 'profile',
          component: ()=> import('../views/Profile.vue'),
          props: true,
          children: [
            {
              path: ':userId',
              name: 'profile',
              component: () => import('../views/Profile.vue'),
              props: true
            }
          ]
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

if (stage == 'test') {
  console.log('test mode')
  router.addRoute('layout',{
    path: 'metrics',
    component: ()=>import('../views/Metrics.vue')
  })
}

router.beforeEach((to, from)=>{
  console.log(to, from);
  return true
});

export default router
