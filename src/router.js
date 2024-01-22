

import { createRouter, createWebHistory } from 'vue-router';


const routes = [

  {
    path:'/',
    component: () => import('./views/HomePage.vue'),
   
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


export default router;
