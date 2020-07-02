import initializeExternalStylesheets from '@/config/initializers/externalStylesheets';
import initializeLongClick from '@/config/initializers/longClick';
import initializeToasted from '@/config/initializers/toasted';

const initializers = {
  initAll() {
    this.initFunctions.forEach((initFunction) => initFunction());
  },
  initFunctions: [
    initializeExternalStylesheets,
    initializeLongClick,
    initializeToasted,
  ],
};

export default initializers;
