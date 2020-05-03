import Vue from 'vue';
import VueRouter from 'vue-router';
import LogIn from '../views/Login/index.vue';
import SignUp from '../views/SignUp/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
