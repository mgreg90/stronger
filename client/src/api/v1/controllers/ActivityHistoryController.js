import controllerBase from './ControllerBase';

const HistoryController = {
  async get() {
    return controllerBase.v1Get(controllerBase.V1_ACTIVITY_HISTORY_PATH);
  },
};

export default HistoryController;
