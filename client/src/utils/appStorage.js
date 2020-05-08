const AUTH_TOKEN = 'WORKOUT_APP_AUTH_TOKEN';

const appStorage = {
  setToken(value) {
    localStorage.setItem(AUTH_TOKEN, value);
  },
  getToken() {
    return localStorage.getItem(AUTH_TOKEN);
  },
};

export default appStorage;
