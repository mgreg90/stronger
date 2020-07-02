import Vue from 'vue';
import LongPress from '@/directives/longPress';

const initializeLongClick = () => {
  Vue.directive('long-press', LongPress);
};

export default initializeLongClick;
