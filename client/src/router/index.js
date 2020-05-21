import Vue from 'vue';
import VueRouter from 'vue-router';
import applyAuthenticatedRoutes from '@/router/authenticate';
import ExerciseSearch from '@/views/ExerciseSearch/index.vue';
import Home from '@/views/Home/index.vue';
import Login from '@/views/Login/index.vue';
import NotFound from '@/views/NotFound/index.vue';
import SignUp from '@/views/SignUp/index.vue';
import Workout from '@/views/Workout/index.vue';

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
    path: '/workouts/:id',
    component: Workout,
  },
  {
    path: '/workouts/:workout_id/exercises/new',
    component: ExerciseSearch,
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
