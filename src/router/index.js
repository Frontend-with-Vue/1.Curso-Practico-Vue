import { createRouter, createWebHistory } from 'vue-router'

const stage = import.meta.env.VITE_STAGE;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rutas de autenticación (sin layout)
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },

    // Rutas con layout (Header.vue)
    {
      path: '/',
      redirect: '/home', // Redirige raíz a /home
      component: () => import('../components/Header.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/Movements.vue'),
        },
        {
          path: 'goals',
          name: 'goals',
          component: () => import('../views/Goals.vue'),
        },
      ],
    },

    // Ruta para manejar 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/404NotFound.vue'),
    },
  ],
});

// Guardia global de navegación
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Verifica si hay un token en el localStorage

  if (to.name !== 'login' && to.name !== 'register' && !isAuthenticated) {
    // Si no está autenticado, redirige al login
    next({ name: 'login' });
  } else {
    next(); // Permite la navegación si está autenticado o la ruta es pública
  }
});

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
