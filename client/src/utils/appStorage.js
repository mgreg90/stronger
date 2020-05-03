const AUTH_TOKEN = 'WORKOUT_APP_AUTH_TOKEN'

const appStorage = {
  setToken(value) {
    localStorage.setItem(AUTH_TOKEN, value)
  }
}
export default appStorage