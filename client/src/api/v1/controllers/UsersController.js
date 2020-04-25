const UsersController = {
  async create(payload) {
    console.log('body', payload);
    const response = await fetch(
      'http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: payload,
      },
    );
    console.log('response', response);
  },
};

export default UsersController;
