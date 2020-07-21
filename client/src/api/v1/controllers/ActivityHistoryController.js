import controllerBase from './ControllerBase';

const HistoryController = {
  async get(options) {
    return controllerBase.v1Get(controllerBase.V1_ACTIVITY_HISTORY_PATH, options);
  },
};

export default HistoryController;
