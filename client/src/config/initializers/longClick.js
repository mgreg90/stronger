import Vue from 'vue';
import LongPress from 'vue-directive-long-press';

const initializeLongClick = () => {
  Vue.directive('long-press', LongPress);
};

export default initializeLongClick;
