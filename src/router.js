

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
    meta: { requiresAuth: false }
  },

  {
    path: '/sign-up',
    component: () => import('./views/SignUp.vue'),
    name: 'SignUp',
    meta: { requiresAuth: false }
  },
  
  {
    path: '/:pathMatch(.*)*',
    component: () => import('./views/NotFound.vue'),
    name: 'NotFound',
  },
  

];

const isLoggedIn = () => {
  const token = localStorage.getItem('access_token');
  return token !== null;
};



const router = createRouter({
  history: createWebHistory(),
  routes,
});



router.beforeEach((to, from, next) => {
  if ((to.name === 'Login' || to.name === 'SignUp') && isLoggedIn()) {
      // If the user is already logged in, redirect to the home page or another route
      next('/');
  } else {
      next();
  }
});

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('access_token');
        if (!token) {
            next({ path: '/login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
