import { v4 as uuidv4 } from 'uuid';

import AppHeader from '@/components/AppHeader.vue';
import AppButton from '@/components/AppButton.vue';
import FloatingButton from '@/components/FloatingButton.vue';
import SetListItem from '@/components/SetListItem.vue';
import TextInput from '@/components/TextInput.vue';
import ExerciseExecutionsController from '@/api/v1/controllers/ExerciseExecutionsController';
import SetExecutionsController from '@/api/v1/controllers/SetExecutionsController';
import { apiUtils, arrayUtils, stringUtils } from '@/utils/index';

const components = {
  AppHeader,
  TextInput,
  SetListItem,
  FloatingButton,
  AppButton,
};

const buildSet = (set = {}) => ({
  weight: set?.weight || 0,
  reps: set?.reps || 1,
  key: uuidv4(),
});

const data = () => ({
  exercise: {
    type: Object,
    default: {},
  },
  sets: [buildSet()],
});

const handleErrors = (self, response) => {
  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(self, response);
    return false;
  }
  return true;
};

const tryDeleteExercise = async (self) => {
  const { exerciseExecutionId } = self.$route.params;
  const response = await ExerciseExecutionsController.delete(exerciseExecutionId);

  const isSuccessful = handleErrors(self, response, false);
  if (!isSuccessful) return false;

  return true;
};

const tryCreateSet = async (self) => {
  const { exerciseExecutionId } = self.$route.params;
  const sets = self.$data.sets.map((set) => ({
    weight: parseInt(set.weight, 10),
    reps: parseInt(set.reps, 10),
    exerciseExecutionId,
    status: 'pending',
  }));

  const response = await SetExecutionsController.create(sets);

  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(self, response);
    return false;
  }

  return true;
};

const methods = {
  addNewSet() {
    const prevSet = arrayUtils.last(this.$data.sets);
    this.$data.sets.push(buildSet(prevSet));
  },

  async handleSubmit() {
    const isSuccessful = await tryCreateSet(this);
    if (!isSuccessful) return;

    const route = `/workouts/${this.$route.params.workoutId}`;

    this.$router.push(route);
  },

  backButtonPath() {
    const { workoutId } = this.$route.params;
    return `/workouts/${workoutId}/exercises/search`;
  },

  onBackClicked() {
    tryDeleteExercise(this);
  },
};

const computed = {
  trimmedExerciseName() {
    const name = this.exercise?.name || 'Stronger';
    return stringUtils.ellipsis(name, 20);
  },
};

async function mounted() {
  const { exerciseExecutionId } = this.$route.params;

  const response = await ExerciseExecutionsController.get(exerciseExecutionId, {
    withExercise: true,
  });

  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(this, response);
    return;
  }

  this.$set(this, 'exercise', response.body.exercise);
}

export default {
  name: 'ExerciseDetails',
  components,
  data,
  methods,
  mounted,
  computed,
};
