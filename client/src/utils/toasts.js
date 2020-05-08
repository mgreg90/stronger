import Vue from 'vue';

const error = (message) => {
  Vue.toasted.show(`<p>${message}</p>`, { type: 'error', icon: 'error' });
};

const toasts = {
  error,
};

export default toasts;
