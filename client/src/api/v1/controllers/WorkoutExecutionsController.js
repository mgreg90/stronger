import controllerBase from './ControllerBase';

const WorkoutExecutionsController = {
  async create(payload = {}) {
    return controllerBase.v1Post(controllerBase.V1_WORKOUT_EXECUTIONS_PATH, payload);
  },

  async get(id) {
    const url = `${controllerBase.V1_WORKOUT_EXECUTIONS_PATH}/${id}`;
    return controllerBase.v1Get(url);
  },
};

export default WorkoutExecutionsController;
