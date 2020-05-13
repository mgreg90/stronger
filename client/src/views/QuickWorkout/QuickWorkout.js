import AppHeader from '@/components/AppHeader.vue';
import AppButton from '@/components/AppButton.vue';
// import FloatingAddButton from '@/components/FloatingAddButton.vue';
import appStorage from '@/utils/appStorage';
import WorkoutExecutionsController from '@/api/v1/controllers/WorkoutExecutionsController';

const components = {
  AppHeader,
  AppButton,
  // FloatingAddButton,
};

const data = () => ({

});

const methods = {
};

const mounted = () => {
  const currentUser = appStorage.getCurrentUser();
  WorkoutExecutionsController.create({
    user_id: currentUser.userId,
  });
};

export default {
  name: 'QuickWorkout',
  components,
  data,
  methods,
  mounted,
};
