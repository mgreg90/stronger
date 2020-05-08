import controllerBase from './ControllerBase';

const SessionsController = {
  async create(payload) {
    return controllerBase.v1Post(controllerBase.V1_SESSIONS_PATH, payload);
  },
};

export default SessionsController;
