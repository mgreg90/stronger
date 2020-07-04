import controllerBase from '../ControllerBase';

const PreviousExecutionSummaryController = {
  async get(id) {
    const path = controllerBase.v1ExercisePreviousExecutionSummaryPath(id);
    return controllerBase.v1Get(path);
  },
};

export default PreviousExecutionSummaryController;
