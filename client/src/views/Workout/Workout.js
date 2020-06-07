import AppHeader from '@/components/AppHeader.vue';
import AppButton from '@/components/AppButton.vue';
import FloatingButton from '@/components/FloatingButton.vue';
import WorkoutExecutionsController from '@/api/v1/controllers/WorkoutExecutionsController';
import SetExecutionsController from '@/api/v1/controllers/SetExecutionsController';
import apiUtils from '@/utils/apiUtils';
import stringUtils from '@/utils/stringUtils';

const components = {
  AppHeader,
  AppButton,
  FloatingButton,
};

const data = () => ({
  workout: {
    exerciseExecutions: [],
  },
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

  async handleSetClick(exerciseIndex, setIndex, item) {
    const response = await SetExecutionsController.update(item.id, {
      status: 'completed',
    });

    if (!apiUtils.isRequestSuccessful(response)) {
      apiUtils.handleErrors(this, response);
      return;
    }

    this.$set(
      this.workout.exerciseExecutions[exerciseIndex].setExecutions,
      setIndex,
      response.body,
    );
  },

  async handleSetLongClick(item) {
    console.log('long click', item.id);
  },

  ellipsis(str) {
    return stringUtils.ellipsis(str, 34);
  },

  isNext(setExecution, exerciseIndex) {
    const exercise = this.workout.exerciseExecutions[exerciseIndex];
    if (!exercise) return false;

    const firstPendingSet = exercise.setExecutions.find((set) =>
      set.status === 'pending');

    return setExecution.id === firstPendingSet.id;
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
