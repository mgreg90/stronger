import controllerBase from './ControllerBase';

const CurrentWorkoutController = {
  async get() {
    return controllerBase.v1Get(controllerBase.V1_CURRENT_WORKOUT_PATH);
  },
};

export default CurrentWorkoutController;
