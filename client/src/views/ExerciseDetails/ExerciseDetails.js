import { v4 as uuidv4 } from 'uuid';

import AppHeader from '@/components/AppHeader.vue';
import AppButton from '@/components/AppButton.vue';
import FloatingButton from '@/components/FloatingButton.vue';
import SetListItem from '@/components/SetListItem.vue';
import TextInput from '@/components/TextInput.vue';
import ExerciseExecutionsController from '@/api/v1/controllers/ExerciseExecutionsController';
import SetExecutionsController from '@/api/v1/controllers/SetExecutionsController';
import apiUtils from '@/utils/apiUtils';
import stringUtils from '@/utils/stringUtils';
import arrayUtils from '../../utils/arrayUtils';

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

const methods = {
  addNewSet() {
    const prevSet = arrayUtils.last(this.$data.sets);
    this.$data.sets.push(buildSet(prevSet));
  },
  async handleSubmit() {
    const { exerciseExecutionId, workoutId } = this.$route.params;
    const sets = this.$data.sets.map((set) => ({
      weight: parseInt(set.weight, 10),
      reps: parseInt(set.reps, 10),
      exerciseExecutionId,
      status: 'pending',
    }));

    const response = await SetExecutionsController.create(sets);

    if (!apiUtils.isRequestSuccessful(response)) {
      apiUtils.handleErrors(this, response);
      return;
    }

    const route = `/workouts/${workoutId}`;

    this.$router.push(route);
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
  console.log('exercise', response.body.exercise);
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
