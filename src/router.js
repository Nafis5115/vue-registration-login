

import { createRouter, createWebHistory } from 'vue-router';


const routes = [

  {
    path:'/',
    component: () => import('./views/HomePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: () => import('./views/LoginPage.vue'),
    name: 'Login',
  },

  {
    path: '/sign-up',
    component: () => import('./views/SignUp.vue'),
    name: 'SignUp',
  },
  
  {
    path: '/:pathMatch(.*)*',
    component: () => import('./views/NotFound.vue'),
    name: 'NotFound',
  },
  

];



const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = /* your authentication logic here */ false;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirect to login page if not authenticated
    next('/login');
  } else {
    next();
  }
});

export default router;
