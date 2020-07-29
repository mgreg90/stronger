import VueClickaway from 'vue-clickaway';
import { apiUtils, dateTimeUtils, stringUtils } from '@/utils';
import { workoutExecutions } from '@/api/v1/controllers';

const props = {
  workout: {},
};

const mixins = [VueClickaway.mixin];

const data = () => ({
  isMenuDisplayed: false,
});

const components = {
};

const minMaxFor = (field, exerciseExecution) => {
  const completedSets = exerciseExecution.setExecutions.filter((se) => se.status === 'completed');
  if (completedSets?.[0]?.[field] == null) return [0, 0]; // `== null` works for null && undefined
  let minVal = completedSets[0][field];
  let maxVal = completedSets[0][field];

  completedSets.forEach((set) => {
    if (set[field] < minVal) minVal = set[field];
    if (set[field] > maxVal) maxVal = set[field];
  });

  return [minVal, maxVal];
};

const createWorkoutExecutionRepeat = async (self) => {
  const response = await workoutExecutions.RepeatController.create(self.workout.id);

  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(self, response);
    return null;
  }
  return response.body;
};

const methods = {
  toggleMenuDisplay() {
    const { isMenuDisplayed } = this;
    this.$set(this, 'isMenuDisplayed', !isMenuDisplayed);
  },
  closeMenuDisplay() {
    this.$set(this, 'isMenuDisplayed', false);
  },
  goToWorkout() {
    this.$router.push(`/workouts/${this.workout.id}`);
  },
  async goToQuickWorkoutFromTemplate() {
    const workoutExecution = await createWorkoutExecutionRepeat(this);
    const { id } = workoutExecution;

    this.$router.push(`/workouts/${id}`);
  },
  nameFor(exerciseExecution) {
    return stringUtils.ellipsis(exerciseExecution.exercise.name, 20);
  },
  repRangeFor(exerciseExecution) {
    const [minReps, maxReps] = minMaxFor('reps', exerciseExecution);
    return `${minReps} - ${maxReps}`;
  },
  weightRangeFor(exerciseExecution) {
    const [minWeight, maxWeight] = minMaxFor('weight', exerciseExecution);
    return `${minWeight} - ${maxWeight}`;
  },
  totalRepsFor(exerciseExecution) {
    const reducer = (acc, set) => {
      // eslint-disable-next-line no-param-reassign
      if (set.status === 'completed') acc += set.reps;
      return acc;
    };
    return exerciseExecution.setExecutions.reduce(reducer, 0);
  },
};

const firstCompletedSet = (workout) => {
  let earliestSet = null;
  workout.exerciseExecutions.forEach((ee) => {
    ee.setExecutions.forEach((se) => {
      if (!earliestSet || new Date(se.finishedAt) < new Date(earliestSet.finishedAt)) {
        earliestSet = se;
      }
    });
  });
  return earliestSet;
};

const lastCompletedSet = (workout) => {
  let lastSet = null;
  workout.exerciseExecutions.forEach((ee) => {
    ee.setExecutions.forEach((se) => {
      if (!lastSet || new Date(se.finishedAt) > new Date(lastSet.finishedAt)) {
        lastSet = se;
      }
    });
  });
  return lastSet;
};

const computed = {
  workoutDate() {
    return dateTimeUtils.formattedDateFromString(this.workout.finishedAt);
  },

  workoutType() {
    let reducer = (acc, ee) => {
      ee.exercise.exerciseTypes.forEach((exType) => {
        acc[exType.name] = acc[exType.name] ? acc[exType.name] + 1 : 1;
      });
      return acc;
    };
    const counts = this.workout.exerciseExecutions.reduce(reducer, {});

    reducer = (acc, key) => {
      if (!acc[0] || acc[0].value === counts[key]) {
        acc.push({ key, value: counts[key] });
        return acc;
        // eslint-disable-next-line no-else-return
      } else if (counts[key] > acc[0].value) {
        return [{ key, value: acc[0].value }];
      }
      return acc;
    };
    const types = Object.keys(counts).reduce(reducer, []);

    return types.map((t) => t.key).join(' | ');
  },

  workoutDuration() {
    const firstSet = firstCompletedSet(this.workout);
    const lastSet = lastCompletedSet(this.workout);
    if (!firstSet || !lastSet) return 'N/A';

    const durationMs = new Date(lastSet.finishedAt) - new Date(firstSet.finishedAt);

    return dateTimeUtils.msToTime(durationMs);
  },
};

export default {
  name: 'HistoryCard',
  data,
  props,
  components,
  computed,
  methods,
  mixins,
};
