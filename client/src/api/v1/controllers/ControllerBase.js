import authService from '@/utils/authService';
import env from '@/config/env';

const BASE_API_URL = env.strongerApiUrl;

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
    return await response.json();
  } catch {
    return {};
  }
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

const v1Patch = async (path, payload) => {
  const headers = standardHeaders();
  const response = await fetch(
    `${BASE_API_URL}${path}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    },
  );

  const body = await tryParseBody(response);
  return { status: response.status, body };
};

const v1Delete = async (path) => {
  const headers = standardHeaders();
  const response = await fetch(
    `${BASE_API_URL}${path}`, {
      method: 'DELETE',
      headers,
    },
  );

  const body = await tryParseBody(response);
  return { status: response.status, body };
};

const controllerBase = {
  V1_CURRENT_WORKOUT_PATH: 'v1/current_workout',
  V1_EXERCISE_EXECUTIONS_PATH: 'v1/exercise_executions',
  V1_EXERCISES_SEARCH_PATH: 'v1/exercises/search',
  V1_SESSIONS_PATH: 'v1/sessions',
  V1_SET_EXECUTIONS_PATH: 'v1/set_executions',
  V1_USERS_PATH: 'v1/users',
  V1_WORKOUT_EXECUTIONS_PATH: 'v1/workout_executions',
  v1ExercisePreviousExecutionSummaryPath: (exerciseId) => `v1/exercises/${exerciseId}/previous_execution_summary`,

  v1Delete,
  v1Get,
  v1Patch,
  v1Post,

  standardHeaders,
};

export default controllerBase;
