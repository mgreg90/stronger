import AppHeader from '@/components/AppHeader.vue';
import AppButton from '@/components/AppButton.vue';
import FloatingButton from '@/components/FloatingButton.vue';
import WorkoutExecutionsController from '@/api/v1/controllers/WorkoutExecutionsController';
import apiUtils from '@/utils/apiUtils';
import stringUtils from '@/utils/stringUtils';

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

const computed = {
  exerciseExecutions() {
    return this.workout?.exerciseExecutions || [];
  },
};

const methods = {
  async goToAddExercise() {
    const { id } = this.$data.workout;

    const route = `/workouts/${id}/exercises/search`;
    this.$router.push(route);
  },
  ellipsis(str) {
    return stringUtils.ellipsis(str, 34);
  },
};

async function mounted() {
  const { id } = this.$route.params;
  const workout = await getWorkout(id);

  this.$set(this, 'workout', workout);
}

export default {
  name: 'Workout',
  components,
  data,
  computed,
  methods,
  mounted,
};
