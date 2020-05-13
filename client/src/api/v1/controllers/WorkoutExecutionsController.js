import controllerBase from './ControllerBase';

const WorkoutExecutionsController = {
  async create(payload) {
    return controllerBase.v1Post(controllerBase.V1_WORKOUTS_PATH, payload);
  },
};

export default WorkoutExecutionsController;
