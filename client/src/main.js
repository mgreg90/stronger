import Vue from 'vue';
import Toasted from 'vue-toasted';

import 'normalize.css';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

const toastedOptions = {
  iconPack: 'material',
  duration: 3000,
};

Vue.use(Toasted, toastedOptions);

const addStylesheet = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

addStylesheet('https://fonts.googleapis.com/icon?family=Material+Icons');
