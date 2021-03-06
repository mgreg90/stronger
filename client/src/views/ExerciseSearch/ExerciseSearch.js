import debounce from 'lodash.debounce';

import AppHeader from '@/components/AppHeader.vue';
import TextInput from '@/components/TextInput.vue';
import ExerciseExecutionsController from '@/api/v1/controllers/ExerciseExecutionsController';
import { exercises } from '@/api/v1/controllers';
import apiUtils from '@/utils/apiUtils';

const components = {
  AppHeader,
  TextInput,
};

const data = () => ({
  searchText: '',
  searchResults: [],
});

const methods = {
  debouncedSearch: debounce(async function search() {
    const response = await exercises.SearchController.create({
      query: this.$data.searchText,
    });

    if (!apiUtils.isRequestSuccessful(response)) {
      apiUtils.handleErrors(this, response);
      return;
    }

    this.$set(this, 'searchResults', response.body);
  }, 250),

  async handleExerciseClicked(exercise) {
    const { workoutId } = this.$route.params;

    const response = await ExerciseExecutionsController.create({
      workoutExecutionId: workoutId,
      exerciseId: exercise.id,
    });

    if (!apiUtils.isRequestSuccessful(response)) {
      apiUtils.handleErrors(this, response);
      return;
    }

    const exerciseExecution = response.body;
    const route = `/workouts/${workoutId}/exercises/${exerciseExecution.id}`;

    this.$router.push(route);
  },

  backButtonPath() {
    const { workoutId } = this.$route.params;
    return `/workouts/${workoutId}`;
  },
};

export default {
  name: 'ExerciseSearch',
  components,
  data,
  methods,
};
