import controllerBase from './ControllerBase';

const SetExecutionsController = {

  async create(payload) {
    return controllerBase.v1Post(controllerBase.V1_SET_EXECUTIONS_PATH, payload);
  },

  async get(id, queryParams) {
    const url = `${controllerBase.V1_SET_EXECUTIONS_PATH}/${id}`;
    return controllerBase.v1Get(url, queryParams);
  },

  async update(id, payload) {
    const url = `${controllerBase.V1_SET_EXECUTIONS_PATH}/${id}`;
    return controllerBase.v1Patch(url, payload);
  },

  async delete(id) {
    const url = `${controllerBase.V1_SET_EXECUTIONS_PATH}/${id}`;
    return controllerBase.v1Delete(url);
  },

};

export default SetExecutionsController;
