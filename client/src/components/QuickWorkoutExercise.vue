<template>
<div
  class="exercise-item-container"
>
  <div class="drag-icon">
    <i class="material-icons md-24">drag_handle</i>
  </div>
  <transition name="slide-right">
    <div
      v-if="isDeleteVisible"
      @click="handleDeleteExerciseClick"
      class="delete-exercise"
    >
      <i class="material-icons md-36">remove_circle_outline</i>
    </div>
  </transition>
  <div class="details"
    v-touch:swipe.right="handleSwipeRight"
    v-touch:swipe.left="handleSwipeLeft"
  >
    <div class="name">
      <p>{{ellipsis(exerciseExecution.exercise.name)}}</p>
    </div>
    <div v-if="previousSummary" class="description">
      <p>{{previousDate}}</p>
      <p>{{previousSetsAndReps}}</p>
      <p>{{previousWeight}}</p>
    </div>
  </div>
  <div class="sets">
    <div
      class="set-item"
      v-for="(setExecution, setIndex) in exerciseExecution.setExecutions"
      @click="handleSetClick(exerciseIndex, setIndex, setExecution)"
      v-touch:longtap="handleSetLongClick(setExecution)"
      :key="setExecution.id"
    >
      <div class="set-item-weight detail">
        <p class="unselectable">{{setExecution.weight}} lbs</p>
      </div>
      <div class="set-item-reps detail">
        <p class="unselectable">{{setExecution.reps}} reps</p>
      </div>
      <div class="set-item-icon detail">
        <i v-if="setExecution.status === 'completed'" class="material-icons md-18 set-item-completed">
          check_circle
        </i>
        <i v-else-if="isNext" class="material-icons md-18 set-item-next">
          play_circle_outline
        </i>
        <i v-else-if="setExecution.status === 'pending'" class="material-icons md-18 set-item-pending">
          pending
        </i>
      </div>
    </div>
    <div class="set-item" @click=handleAddSetClick(exerciseExecution)>
      <p class="add-set-text">Add Set</p>
      <i class="add-set-button material-icons md-18">add_circle</i>
    </div>
  </div>
</div>
</template>

<script>
import ExerciseExecutionsController from '@/api/v1/controllers/ExerciseExecutionsController';
import {
  apiUtils,
  stringUtils,
} from '@/utils';

const props = {
  exerciseExecution: {
    type: Object,
    default: {},
  },
  previousSummary: {
    type: Object,
    default: null,
  },
  isNext: {
    type: Boolean,
    default: false,
  },
};

const data = () => ({
  isDeleteVisible: false,
});

const components = {
};

const computed = {
};

const handleErrors = (self, response) => {
  if (!apiUtils.isRequestSuccessful(response)) {
    apiUtils.handleErrors(self, response);
    return false;
  }
  return true;
};

const tryDeleteExerciseExecution = async (self, id) => {
  const response = await ExerciseExecutionsController.delete(id);

  const isSuccessful = handleErrors(self, response, false);
  if (!isSuccessful) return false;

  return true;
};

const methods = {
  previousDate() {
    return `Previously: ${this.previousSummary.date}`;
  },

  previousSetsAndReps() {
    const { previousSummary } = this;
    const { numSets, minReps, maxReps } = previousSummary;

    return `Sets: ${numSets} | Reps: ${minReps} - ${maxReps}`;
  },

  previousWeight() {
    return `Wt: ${this.previousSummary.minWeight} - ${this.previousSummary.maxWeight}`;
  },

  handleSwipeRight() {
    if (this.isDeleteVisible) return;

    this.$set(this, 'isDeleteVisible', true);
  },

  handleSwipeLeft() {
    if (!this.isDeleteVisible) return;

    this.$set(this, 'isDeleteVisible', false);
  },

  async handleDeleteExerciseClick() {
    const { id } = this.exerciseExecution;
    const isExerciseExecutionDeleted = await tryDeleteExerciseExecution(this, id);

    if (isExerciseExecutionDeleted) {
      const idx = this.workout.exerciseExecutions.findIndex((ee) => ee.id === id);
      this.workout.exerciseExecutions.splice(idx, 1);

      const deleteIdx = this.deleteExerciseIds.findIndex((curId) => curId === id);
      this.deleteExerciseIds.splice(deleteIdx, 1);
    }
  },

  async handleDeleteClick() {
    const { id } = this.exerciseExecution;
    const isExerciseExecutionDeleted = await tryDeleteExerciseExecution(this, id);

    if (isExerciseExecutionDeleted) {
      const idx = this.workout.exerciseExecutions.findIndex((ee) => ee.id === id);
      this.workout.exerciseExecutions.splice(idx, 1);

      const deleteIdx = this.deleteExerciseIds.findIndex((curId) => curId === id);
      this.deleteExerciseIds.splice(deleteIdx, 1);
    }
  },

  handleSetLongClick() {
    this.$emit('longClick', this.exerciseExecution);
  },

  ellipsis(str) {
    return stringUtils.ellipsis(str, 34);
  },

};

export default {
  name: 'QuickWorkoutExercise',
  data,
  props,
  components,
  computed,
  methods,
};
</script>

<style lang="scss" scoped>
.exercise-item-container {
  display: flex;
  justify-content: flex-start;
  height: 120px;
  max-height: 120px;
  font-family: $default-font;
  position: relative;

  .drag-icon {
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    background-color: white;
    z-index: 2;
  }

  .delete-exercise {
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $red;
    color: $white;
    margin: 5px 10px 5px 0px;
    border-radius: 10px;
    border: darken($red, 5%) solid 1px;
    z-index: 1;
  }

  .details {
    min-width: 150px;
    position: relative;

    .name {
      height: 50%;
      display: flex;

      p {
        align-self: flex-end;
        margin: 0;
      }
    }

    .description {
      height: 50%;
      p {
        margin: 0;
        font-size: 12px;
        color: $grey
      }
    }
  }

  .details:after {
    content: "";
    position: absolute;
    top: 20px;
    right: 0;
    height: 80px;
    width: 1px;
    background: $light-blue;
  }

  .sets {
    display: flex;
    overflow-x: scroll;
    width: 100%;
    height: 100%;

    .set-item {
      width: 80px;
      min-width: 100px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      padding: 10px 0;
      position: relative;

      p {
        margin: 0;
      }

      .detail {
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;

        .set-item-completed {
          color: $green;
        }

        .set-item-pending {
          color: $yellow;
        }
      }

      .set-item-weight {
        height: 25%;
      }
      .set-item-reps {
        height: 25%;
      }
      .set-item-icon {
        height: 50%;
        color: $light-blue;
      }
    }

    .set-item:not(:first-child):before {
      content: "";
      position: absolute;
      top: 20px;
      height: 80px;
      background: $light-blue;
      width: 1px;
    }

    .set-item:last-child:after {
      content: "";
      position: absolute;
      top: 20px;
      height: 80px;
      right: 0;
      background: $light-blue;
      width: 1px;
    }

    .add-set-text {
      height: 35%;
      display: flex;
      justify-content: center;
      top: 25%;
      position: relative;
    }

    .add-set-button {
      height: 25%;
      display: flex;
      justify-content: center;
      top: 25%;
      position: relative;
    }
  }
}
</style>
