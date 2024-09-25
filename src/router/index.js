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
          component: ()=> import('../views/Movements.vue')
        },
        {
          path: 'goals',
          name: 'goals',
          component: () => import('../views/Goals.vue')
        }
      ]
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
