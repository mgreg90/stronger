import {
  AppButton,
  AppHeader,
  HistoryCard,
} from '@/components';
import {
  ActivityHistoryController,
  WorkoutExecutionsController,
} from '@/api/v1/controllers';
import apiUtils from '@/utils/apiUtils';

const components = {
  AppButton,
  AppHeader,
  HistoryCard,
};

const data = () => ({
  workoutExecutions: [],
});

const createWorkout = async () => {
  const response = await WorkoutExecutionsController.create({});

  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(this, response);
    return null;
  }
  return response.body;
};

const fetchActivityHistory = async (self) => {
  const response = await ActivityHistoryController.get();
  console.log('response', response);
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
  goToBuildWorkoutPlan() {
    this.$router.push('/workoutPlan/new');
  },
};

async function mounted() {
  const history = await fetchActivityHistory(this);
  this.$data.workoutExecutions.push(...history);
}

export default {
  name: 'History',
  components,
  data,
  methods,
  mounted,
};
