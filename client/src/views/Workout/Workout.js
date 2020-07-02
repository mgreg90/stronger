import {
  AppButton,
  AppHeader,
  FloatingButton,
  Modal,
  TextInput,
} from '@/components';
import ExerciseExecutionsController from '@/api/v1/controllers/ExerciseExecutionsController';
import SetExecutionsController from '@/api/v1/controllers/SetExecutionsController';
import WorkoutExecutionsController from '@/api/v1/controllers/WorkoutExecutionsController';
import { apiUtils, stringUtils } from '@/utils';

import cloneDeep from 'lodash.clonedeep';

const components = {
  AppHeader,
  AppButton,
  FloatingButton,
  Modal,
  TextInput,
};

const data = () => ({
  workout: {
    exerciseExecutions: [],
  },
  editingSet: null,
  isModalEdit: false,
  deleteExerciseIds: [],
});

const computed = {
  exerciseExecutions() {
    return this.workout?.exerciseExecutions || [];
  },
  modalHeader() {
    return this.isModalEdit ? 'Edit Set' : 'Add Set';
  },
};

const handleErrors = (self, response) => {
  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(self, response);
    return false;
  }
  return true;
};

const getWorkout = async (self, id) => {
  const response = await WorkoutExecutionsController.get(id, {
    withSetExecutions: true,
  });

  const isSuccessful = handleErrors(self, response, false);
  if (!isSuccessful) return false;


  return response.body;
};

const tryCompleteSet = async (self, exerciseIndex, setIndex, item) => {
  const response = await SetExecutionsController.update(item.id, {
    status: 'completed',
  });

  const isSuccessful = handleErrors(self, response, false);
  if (!isSuccessful) return false;

  self.$set(
    self.workout.exerciseExecutions[exerciseIndex].setExecutions,
    setIndex,
    response.body,
  );
  return true;
};

const tryUpdateWorkout = async (self, field, value) => {
  const response = await WorkoutExecutionsController.update(self.workout.id, {
    [field]: value,
  });

  const isSuccessful = handleErrors(self, response, false);
  if (!isSuccessful) return false;

  self.$set(
    self.workout,
    field,
    response.body[field],
  );
  return true;
};

const tryDeleteExerciseExecution = async (self, id) => {
  const response = await ExerciseExecutionsController.delete(id);

  const isSuccessful = handleErrors(self, response, false);
  if (!isSuccessful) return false;

  return true;
};

const tryUpdateSet = async (self) => {
  const response = await SetExecutionsController.update(self.editingSet.id, {
    weight: self.editingSet.weight,
    reps: self.editingSet.reps,
  });

  const isSuccessful = handleErrors(self, response, false);
  if (!isSuccessful) return null;

  return response.body;
};

const tryDeleteSet = async (self) => {
  const response = await SetExecutionsController.delete(self.editingSet.id);

  const isSuccessful = handleErrors(self, response, false);
  if (!isSuccessful) return false;

  return true;
};

const tryCreateSet = async (self) => {
  const response = await SetExecutionsController.create({
    ...self.editingSet,
    status: 'pending',
  });

  const isSuccessful = handleErrors(self, response, false);
  if (!isSuccessful) return null;

  return response.body[0];
};

const findSetIndices = (self, id) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [eeIdx, ee] of self.exerciseExecutions.entries()) {
    const seIdx = ee.setExecutions.findIndex((se) => se.id === id);
    if (seIdx !== -1) return [eeIdx, seIdx];
  }
  return [];
};

const tryStartWorkout = async (self) =>
  tryUpdateWorkout(self, 'startedAt', new Date());

const tryFinishWorkout = async (self) =>
  tryUpdateWorkout(self, 'finishedAt', new Date());

const updateSet = async (self) => {
  const updatedSet = await tryUpdateSet(self);
  if (!updatedSet) return;

  const [exerciseIndex, setIndex] = findSetIndices(self, self.editingSet.id);

  const exerciseExecution = self.workout.exerciseExecutions[exerciseIndex];
  exerciseExecution.setExecutions[setIndex] = updatedSet;

  self.$set(self.workout.exerciseExecutions, exerciseIndex, exerciseExecution);
};

const createSet = async (self) => {
  const createdSet = await tryCreateSet(self);
  if (!createdSet) return;

  const { exerciseExecutionId } = self.editingSet;
  const exerciseIndex = self.workout.exerciseExecutions.findIndex((ee) =>
    ee.id === exerciseExecutionId);
  const exerciseExecution = self.workout.exerciseExecutions[exerciseIndex];

  exerciseExecution.setExecutions.push(createdSet);
  self.$set(self.workout.exerciseExecutions, exerciseIndex, exerciseExecution);
};

const removeSet = (self, setId) => {
  let exerciseExecutionIndex;
  let setIndex;

  self.workout.exerciseExecutions.forEach((ee, idx) => {
    if (exerciseExecutionIndex) return;

    const curSetIndex = ee.setExecutions.findIndex((se) => se?.id === setId);

    if (curSetIndex !== -1) {
      exerciseExecutionIndex = idx;
      setIndex = curSetIndex;
    }
  });

  self.workout.exerciseExecutions[exerciseExecutionIndex].setExecutions.splice(setIndex, 1);
};

const methods = {
  async goToAddExercise() {
    const { id } = this.$data.workout;

    const route = `/workouts/${id}/exercises/search`;
    this.$router.push(route);
  },

  async handleSetClick(exerciseIndex, setIndex, item) {
    const isSetUpdated = await tryCompleteSet(this, exerciseIndex, setIndex, item);
    if (!isSetUpdated) return;
    if (!this.workout.startedAt) await tryStartWorkout(this);
  },

  async handleDeleteEditingSetClick() {
    const deletedSetId = this.editingSet.id;
    const isSetDeleted = await tryDeleteSet(this);

    if (isSetDeleted) {
      removeSet(this, deletedSetId);
    }

    this.$refs.setExecutionModal.closeModal();
  },

  async handleDeleteExerciseClick(exerciseExecution) {
    const { id } = exerciseExecution;
    const isExerciseExecutionDeleted = await tryDeleteExerciseExecution(this, id);

    if (isExerciseExecutionDeleted) {
      const idx = this.workout.exerciseExecutions.findIndex((ee) => ee.id === id);
      this.workout.exerciseExecutions.splice(idx, 1);

      const deleteIdx = this.deleteExerciseIds.findIndex((curId) => curId === id);
      this.deleteExerciseIds.splice(deleteIdx, 1);
    }
  },

  async handleSaveEditingSetClick() {
    if (this.editingSet.id) {
      await updateSet(this);
    } else {
      await createSet(this);
    }

    this.$refs.setExecutionModal.closeModal();
  },

  handleSetLongClick(item) {
    this.$set(this, 'editingSet', cloneDeep(item));
    this.$set(this, 'isModalEdit', true);
    this.$refs.setExecutionModal.openModal();
  },

  handleAddSetClick(exerciseExecution) {
    const lastSet = exerciseExecution.setExecutions[exerciseExecution.setExecutions.length - 1];

    this.$set(this, 'editingSet', {
      reps: lastSet?.reps || 0,
      weight: lastSet?.weight || 0,
      exerciseExecutionId: exerciseExecution.id,
    });
    this.$set(this, 'isModalEdit', false);
    this.$refs.setExecutionModal.openModal();
  },

  handleExerciseSwipeRight(exerciseExecution) {
    return () => {
      if (this.deleteExerciseIds.includes(exerciseExecution.id)) return;

      this.deleteExerciseIds.push(exerciseExecution.id);
    };
  },

  handleExerciseSwipeLeft(exerciseExecution) {
    return () => {
      const idx = this.deleteExerciseIds.findIndex((ee) => ee === exerciseExecution.id);
      console.log(exerciseExecution, idx);
      if (idx === -1) return;

      this.deleteExerciseIds.splice(idx, 1);
    };
  },

  async handleWorkoutCompleted() {
    const isWorkoutFinished = await tryFinishWorkout(this);
    if (isWorkoutFinished) {
      this.$router.push('/home');
    }
  },

  handleModalClose() {
    this.$set(this, 'editingSet', null);
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

  exerciseHasDelete(exercise) {
    return this.deleteExerciseIds.includes(exercise.id);
  },
};

async function mounted() {
  const { id } = this.$route.params;
  const workout = await getWorkout(this, id);

  workout.exerciseExecutions = workout.exerciseExecutions.map((ee) => {
    const setExecutions = ee.setExecutions.sort((a, b) => (a.order < b.order ? -1 : 1));
    return { ...ee, setExecutions };
  });

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
