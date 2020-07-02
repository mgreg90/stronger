import initializeExternalStylesheets from '@/config/initializers/externalStylesheets';
import initializeLongClick from '@/config/initializers/longClick';
import initializeToasted from '@/config/initializers/toasted';
import initializeVue2TouchEvents from '@/config/initializers/vue2TouchEvents';

const initializers = {
  initAll() {
    this.initFunctions.forEach((initFunction) => initFunction());
  },
  initFunctions: [
    initializeExternalStylesheets,
    initializeLongClick,
    initializeToasted,
    initializeVue2TouchEvents,
  ],
};

export default initializers;
