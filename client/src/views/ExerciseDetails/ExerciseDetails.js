import AppHeader from '@/components/AppHeader.vue';
import ExerciseExecutionsController from '@/api/v1/controllers/ExerciseExecutionsController';
import apiUtils from '@/utils/apiUtils';
import stringUtils from '@/utils/stringUtils';

const components = {
  AppHeader,
};

const data = () => ({
  exercise: {
    type: Object,
    default: {},
  },
});

const methods = {

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
