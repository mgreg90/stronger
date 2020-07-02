import Vue from 'vue';
import 'normalize.css';

import App from '@/App.vue';
import router from '@/router';
import initializers from '@/config/initializers';

initializers.initAll();

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
