const UsersController = {
  async create(payload) {
    const response = await fetch(
      'http://localhost:3000/api/v1/users', {
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
  },
};

export default UsersController;
