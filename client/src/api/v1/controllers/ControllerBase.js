import authService from '@/utils/authService';

const BASE_API_URL = 'http://localhost:3000/api/';

const standardHeaders = () => {
  const authorization = authService.authorizationHeader();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (authorization) headers.Authorization = authorization;
  return headers;
};

const tryParseBody = async (response) => {
  try {
    const res = await response.json();
    return res;
  } catch {
    return {};
  }
};

const v1Post = async (path, payload) => {
  const headers = standardHeaders();
  const response = await fetch(
    `${BASE_API_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    },
  );

  const body = await tryParseBody(response);
  return { status: response.status, body };
};

const v1Get = async (path, payload) => {
  const headers = standardHeaders();
  const queryString = new URLSearchParams(payload);
  const response = await fetch(
    `${BASE_API_URL}${path}?${queryString}`, {
      method: 'GET',
      headers,
    },
  );

  const body = await tryParseBody(response);
  return { status: response.status, body };
};

const controllerBase = {
  V1_EXERCISE_EXECUTIONS_PATH: 'v1/exercise_executions',
  V1_EXERCISES_SEARCH_PATH: 'v1/exercises/search',
  V1_SESSIONS_PATH: 'v1/sessions',
  V1_USERS_PATH: 'v1/users',
  V1_WORKOUT_EXECUTIONS_PATH: 'v1/workout_executions',

  v1Get,
  v1Post,

  standardHeaders,
};

export default controllerBase;
