import controllerBase from '@/api/v1/controllers/ControllerBase';

const RepeatController = {
  async create(id) {
    return controllerBase.v1Post(controllerBase.v1WorkoutExecutionsRepeatPath(id));
  },
};

export default RepeatController;
