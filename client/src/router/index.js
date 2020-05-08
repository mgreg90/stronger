import Vue from 'vue';
import VueRouter from 'vue-router';
import applyAuthenticatedRoutes from '@/router/authenticate';
import Login from '@/views/Login/index.vue';
import SignUp from '@/views/SignUp/index.vue';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp,
    meta: {
      public: true,
    },
    // TODO figure out how to handle this
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      public: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      public: true,
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

applyAuthenticatedRoutes(router);

export default router;
