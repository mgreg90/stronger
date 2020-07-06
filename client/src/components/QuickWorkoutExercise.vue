<template>
<div
  class="exercise-item-container"
>
  <div class="drag-icon">
    <i class="material-icons md-24">drag_handle</i>
  </div>
  <transition name="slide-right">
    <div
      v-if="exerciseHasDelete(exerciseExecution)"
      @click="handleDeleteExerciseClick(exerciseExecution)"
      class="delete-exercise"
    >
      <i class="material-icons md-36">remove_circle_outline</i>
    </div>
  </transition>
  <div class="details"
    v-touch:swipe.right="handleExerciseSwipeRight(exerciseExecution)"
    v-touch:swipe.left="handleExerciseSwipeLeft(exerciseExecution)"
  >
    <div class="name">
      <p>{{ellipsis(exerciseExecution.exercise.name)}}</p>
    </div>
    <div v-if="previousSummaryFor(exerciseExecution)" class="description">
      <p>{{previousDate(exerciseExecution)}}</p>
      <p>{{previousSetsAndReps(exerciseExecution)}}</p>
      <p>{{previousWeight(exerciseExecution)}}</p>
    </div>
  </div>
  <div class="sets">
    <div
      class="set-item"
      v-for="(setExecution, setIndex) in exerciseExecution.setExecutions"
      @click="handleSetClick(exerciseIndex, setIndex, setExecution)"
      v-long-press="1500"
      @long-press-start="handleSetLongClick(setExecution)"
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
        <i v-else-if="isNext(setExecution, exerciseIndex)" class="material-icons md-18 set-item-next">
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
const props = {
};

const components = {
};

const methods = {
  previousDate() {
    return `Previously: ${previousSummaryFor(exerciseExecution).date}`;
  },
  previousSetsAndReps() {
    return `Sets: ${previousSummaryFor(exerciseExecution).numSets} | Reps: ${previousSummaryFor(exerciseExecution).minReps} - ${previousSummaryFor(exerciseExecution).maxReps}`;
  },
  previousWeight() {
    return `Wt: ${previousSummaryFor(exerciseExecution).minWeight} - ${previousSummaryFor(exerciseExecution).maxWeight}`;
  }
};

export default {
  name: 'QuickWorkoutExercise',
  props,
  components,
  methods,
};
</script>

<style lang="scss" scoped>
</style>
