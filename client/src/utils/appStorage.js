import tokenService from './tokenService';

const AUTH_TOKEN = 'WORKOUT_APP_AUTH_TOKEN';

const setToken = (value) => { localStorage.setItem(AUTH_TOKEN, value); };
const getToken = () => localStorage.getItem(AUTH_TOKEN);

const getCurrentUser = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const parsedToken = tokenService.parse(token);
  return { id: parsedToken.user_id, email: parsedToken.email };
};

const appStorage = {
  setToken,
  getToken,
  getCurrentUser,
};

export default appStorage;
