import appStorage from '@/utils/appStorage';
import tokenService from '../utils/tokenService';

const applyAuthenticatedRoutes = (router) => {
  router.beforeEach((to, from, next) => {
    if (to.meta?.public) {
      next();
      return;
    }

    const token = appStorage.getToken();
    const isValid = tokenService.isValid(token);

    if (!isValid) {
      next({ path: '/login' });
      return;
    }

    next();
  });
  return router;
};

export default applyAuthenticatedRoutes;
