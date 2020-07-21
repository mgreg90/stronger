import Loading from 'vue-loading-overlay';
import { AppButton, AppHeader, HistoryCard } from '@/components';
import {
  ActivityHistoryController,
  WorkoutExecutionsController,
} from '@/api/v1/controllers';
import apiUtils from '@/utils/apiUtils';

const components = {
  AppButton,
  AppHeader,
  HistoryCard,
  Loading,
};

const data = () => ({
  workoutExecutions: [],
  isFetching: false,
  lastPage: 0,
  allHistoryFetched: false,
});

const createWorkout = async () => {
  const response = await WorkoutExecutionsController.create({});

  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(this, response);
    return null;
  }
  return response.body;
};

const fetchActivityHistory = async (self, page = 1) => {
  if (self.allHistoryFetched || self.isFetching) return null;

  self.$set(self, 'isFetching', true);
  const response = await ActivityHistoryController.get({ page });
  self.$set(self, 'isFetching', false);

  if (apiUtils.isNotFound(response)) return null;

  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(self, response);
    return null;
  }

  if (response.body.length < 5) self.$set(self, 'allHistoryFetched', true);

  self.$set(self, 'lastPage', page);
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
  async handleScroll() {
    const homeContainer = this.$refs['home-container'];
    if (homeContainer.offsetHeight + homeContainer.scrollTop < homeContainer.scrollHeight) return;

    const history = await fetchActivityHistory(this, this.lastPage + 1);
    if (!history) return;
    this.$data.workoutExecutions.push(...history);
  },
};

async function mounted() {
  const history = await fetchActivityHistory(this);
  if (!history) return;
  this.$data.workoutExecutions.push(...history);
}

export default {
  name: 'History',
  components,
  data,
  methods,
  mounted,
};
