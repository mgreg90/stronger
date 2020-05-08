import controllerBase from './ControllerBase';

const UsersController = {
  async create(payload) {
    return controllerBase.v1Post(controllerBase.V1_USERS_PATH, payload);
  },
};

export default UsersController;
