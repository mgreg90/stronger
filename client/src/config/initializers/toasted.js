import Vue from 'vue';
import Toasted from 'vue-toasted';

const initializeToasted = () => {
  const toastedOptions = {
    iconPack: 'material',
    duration: 3000,
  };

  Vue.use(Toasted, toastedOptions);
};

export default initializeToasted;
