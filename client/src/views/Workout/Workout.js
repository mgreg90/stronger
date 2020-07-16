import {
  AppButton,
  AppHeader,
} from '@/components';
import WorkoutExecutionsController from '@/api/v1/controllers/WorkoutExecutionsController';
import CurrentWorkoutController from '@/api/v1/controllers/CurrentWorkoutController';
import apiUtils from '@/utils/apiUtils';

const components = {
  AppButton,
  AppHeader,
};

const data = () => ({
  currentWorkout: null,
});

const createWorkout = async () => {
  const response = await WorkoutExecutionsController.create({});

  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(this, response);
    return null;
  }
  return response.body;
};

const fetchCurrentWorkout = async (self) => {
  const response = await CurrentWorkoutController.get();

  if (apiUtils.isNotFound(response)) return null;

  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(self, response);
    return null;
  }
  return response.body;
};

const methods = {
  async goToQuickWorkout() {
    const workout = await createWorkout();
    this.$router.push(`/workouts/${workout.id}`);
  },

  async goToCurrentWorkout() {
    this.$router.push(`/workouts/${this.currentWorkout.id}`);
  },

  goToBuildWorkoutPlan() {
    this.$router.push('/workoutPlan/new');
  },
};

async function mounted() {
  const currentWorkout = await fetchCurrentWorkout(this);
  if (!currentWorkout) return;
  this.$set(this, 'currentWorkout', currentWorkout);
}

export default {
  name: 'Home',
  components,
  data,
  methods,
  mounted,
};
