import appStorage from '@/utils/appStorage';
import authService from '@/utils/authService';

const applyAuthenticatedRoutes = (router) => {
  router.beforeEach((to, from, next) => {
    if (to.meta?.public) {
      next();
      return;
    }

    const token = appStorage.getToken();
    const isValid = authService.isValidToken(token);

    if (!isValid) {
      next({ path: '/login' });
      return;
    }

    next();
  });
  return router;
};

export default applyAuthenticatedRoutes;
