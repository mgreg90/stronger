import Vue from 'vue';
import VueRouter from 'vue-router';
import applyAuthenticatedRoutes from '@/router/authenticate';
import Login from '@/views/Login/index.vue';
import SignUp from '@/views/SignUp/index.vue';
import Home from '@/views/Home/index.vue';
import NotFound from '@/views/NotFound/index.vue';
import QuickWorkout from '@/views/QuickWorkout/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: SignUp,
    meta: {
      public: true,
    },
  },
  {
    path: '/signup',
    component: SignUp,
    meta: {
      public: true,
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      public: true,
    },
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/quickWorkout/new',
    component: QuickWorkout,
  },
  {
    path: '*',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

applyAuthenticatedRoutes(router);

export default router;
