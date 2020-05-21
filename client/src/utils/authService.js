import appStorage from './appStorage';
// eslint-disable-next-line
import jwt_decode from 'jwt-decode';

const parseToken = (token) => jwt_decode(token);

const isValidToken = (token) => {
  if (!token) return false;

  const authObject = parseToken(token);
  const currentTime = new Date().getTime() / 1000;

  if (authObject?.exp <= currentTime) return false;

  return true;
};

const authorizationHeader = () => `Bearer ${appStorage.getToken()}`

const currentUser = () => {
  const token = appStorage.getToken();
  const parsedToken = parseToken(token);
  return { id: parsedToken.user_id, email: parsedToken.email };
}

const authService = {
  isValidToken,
  parseToken,
  authorizationHeader,
  currentUser,
};

export default authService;
