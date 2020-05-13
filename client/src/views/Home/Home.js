import AppHeader from '@/components/AppHeader.vue';
import AppButton from '@/components/AppButton.vue';

const components = {
  AppHeader,
  AppButton,
};

const data = () => ({

});

const methods = {
  goToQuickWorkout() {
    this.$router.push('/quickWorkout/new');
  },
  goToBuildWorkoutPlan() {
    this.$router.push('/workoutPlan/new');
  },
};

export default {
  name: 'Home',
  components,
  data,
  methods,
};
