const controllerBase = {
  V1_USERS_PATH: 'v1/users',
  V1_SESSIONS_PATH: 'v1/sessions',

  async v1Post(path, payload) {
    const response = await fetch(
      `http://localhost:3000/api/${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
    );
    const body = await response.json();
    return { status: response.status, body };
  }
};

export default controllerBase;
