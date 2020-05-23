import AppHeader from '@/components/AppHeader.vue';
import AppButton from '@/components/AppButton.vue';
import WorkoutExecutionsController from '@/api/v1/controllers/WorkoutExecutionsController';
import apiUtils from '@/utils/apiUtils';

const components = {
  AppHeader,
  AppButton,
};

const data = () => ({

});

const createWorkout = async () => {
  const response = await WorkoutExecutionsController.create({});

  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(this, response);
    return null;
  }
  return response.body;
};

const methods = {
  async goToQuickWorkout() {
    const workout = await createWorkout();
    this.$router.push(`/workouts/${workout.id}`);
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
