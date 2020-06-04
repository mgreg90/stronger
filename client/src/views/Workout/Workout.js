import AppHeader from '@/components/AppHeader.vue';
import AppButton from '@/components/AppButton.vue';
import FloatingButton from '@/components/FloatingButton.vue';
import WorkoutExecutionsController from '@/api/v1/controllers/WorkoutExecutionsController';
import apiUtils from '@/utils/apiUtils';

const components = {
  AppHeader,
  AppButton,
  FloatingButton,
};

const data = () => ({
  workout: null,
});

const getWorkout = async (id) => {
  const response = await WorkoutExecutionsController.get(id, {
    withSetExecutions: true,
  });

  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(this, response);
    return null;
  }
  return response.body;
};

const methods = {
  async goToAddExercise() {
    const { id } = this.$data.workout;
    debugger;

    const route = `/workouts/${id}/exercises/search`;
    this.$router.push(route);
  },
};

async function mounted() {
  const { id } = this.$route.params;
  const workout = await getWorkout(id);
  debugger;
  this.$set(this, 'workout', workout);
}

export default {
  name: 'Workout',
  components,
  data,
  methods,
  mounted,
};
