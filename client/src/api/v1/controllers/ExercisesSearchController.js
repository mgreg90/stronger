import controllerBase from './ControllerBase';

const ExercisesSearchController = {
  async create(payload) {
    return controllerBase.v1Post(controllerBase.V1_EXERCISES_SEARCH_PATH, payload);
  },
};

export default ExercisesSearchController;
