import Vue from 'vue';
import VueRouter from 'vue-router';
import applyAuthenticatedRoutes from '@/router/authenticate';
import {
  ExerciseDetails,
  ExerciseSearch,
  History,
  Login,
  NotFound,
  QuickWorkout,
  Workout,
  SignUp,
} from '@/views';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: History,
  },
  {
    path: '/signup',
    component: SignUp,
    meta: {
      public: true,
      skipNav: true,
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      public: true,
      skipNav: true,
    },
  },
  {
    path: '/history',
    component: History,
  },
  {
    path: '/workouts',
    component: Workout,
  },
  {
    path: '/workouts/:id',
    component: QuickWorkout,
  },
  {
    path: '/workouts/:workoutId/exercises/search',
    component: ExerciseSearch,
  },
  {
    path: '/workouts/:workoutId/exercises/:exerciseExecutionId',
    component: ExerciseDetails,
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
