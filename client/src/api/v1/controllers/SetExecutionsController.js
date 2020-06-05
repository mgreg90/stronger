import controllerBase from './ControllerBase';

const SetExecutionsController = {

  async create(payload) {
    return controllerBase.v1Post(controllerBase.V1_SET_EXECUTIONS_PATH, payload);
  },

  async get(id, queryParams) {
    const url = `${controllerBase.V1_SET_EXECUTIONS_PATH}/${id}`;
    return controllerBase.v1Get(url, queryParams);
  },

};

export default SetExecutionsController;
