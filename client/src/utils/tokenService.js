// eslint-disable-next-line
import jwt_decode from 'jwt-decode';

const parse = (token) => { jwt_decode(token); };

const isValid = (token) => {
  if (!token) return false;

  const authObject = parse(token);
  const currentTime = new Date().getTime() / 1000;

  if (authObject?.exp <= currentTime) return false;

  return true;
};

const tokenService = {
  isValid,
  parse,
};

export default tokenService;
