// eslint-disable-next-line
import jwt_decode from 'jwt-decode';

const tokenService = {
  isValid(token) {
    if (!token) return false;

    const authObject = this.parse(token);
    const currentTime = new Date().getTime() / 1000;

    if (authObject?.exp <= currentTime) return false;

    return true;
  },
  parse(token) {
    return jwt_decode(token);
  },
};

export default tokenService;
