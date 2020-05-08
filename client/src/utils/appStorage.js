const AUTH_TOKEN = 'WORKOUT_APP_AUTH_TOKEN';

const setToken = (value) => { localStorage.setItem(AUTH_TOKEN, value); };
const getToken = () => localStorage.getItem(AUTH_TOKEN);

const appStorage = {
  setToken,
  getToken,
};

export default appStorage;
