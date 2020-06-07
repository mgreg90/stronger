<template>
  <div class="exercise-item-container">
    <div class="drag-icon">
      <i class="material-icons md-18">drag_handle</i>
    </div>
    <div class="details">
      <div class="name">
        <p>{{ellipsis(exerciseExecution.exercise.name)}}</p>
      </div>
      <div class="description">
        <p>Previously: 5/12/20</p>
        <p>Sets: 3</p>
        <p>Max Wt: 165</p>
      </div>
    </div>
    <div class="sets">
      <div
        class="set-item"
        v-for="(setExecution, setIndex) in exerciseExecution.setExecutions"
        @click="handleSetClick(exerciseIndex, setIndex, setExecution)"
        v-long-press="2000"
        @long-press-start="handleSetLongClick(setExecution)"
        :key="setExecution.id"
      >
        <div class="set-item-weight detail">
          <p>{{setExecution.weight}} lbs</p>
        </div>
        <div class="set-item-reps detail">
          <p>{{setExecution.reps}} reps</p>
        </div>
        <div class="set-item-icon detail">
          <i
            v-if="setExecution.status === 'completed'"
            class="material-icons md-18 set-item-completed">check_circle</i>
          <i
            v-else-if="isNext(setExecution, exerciseIndex)"
            class="material-icons md-18 set-item-next">play_circle_outline</i>
          <i
            v-else-if="setExecution.status === 'pending'"
            class="material-icons md-18 set-item-pending">pending</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stringUtils from '@/utils/stringUtils';

const props = {
  exerciseExecutions: [],
  exerciseExecution: {
  },
  exerciseIndex: Number,
};

const components = {
};

const methods = {

  ellipsis(str) {
    return stringUtils.ellipsis(str, 34);
  },

  isNext(setExecution, exerciseIndex) {
    const exercise = this.exerciseExecutions[exerciseIndex];
    if (!exercise) return false;

    const firstPendingSet = exercise.setExecutions.find((set) =>
      set.status === 'pending');

    return setExecution.id === firstPendingSet.id;
  },
};

export default {
  name: 'ExerciseExecutionItem',
  props,
  components,
  methods,
};
</script>

<style lang="scss" scoped>
.exercise-item-container {
  display: grid;
  grid-template-columns: 60px 140px auto;
  height: 100px;
  max-height: 100px;
  font-family: Nobile;
  position: relative;

  .drag-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .details {
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
        color: #D3D3D3
      }
    }
  }

  .details:after {
    content: "";
    position: absolute;
    top: 20px;
    right: 0;
    height: 60px;
    width: 1px;
    background: #3E92CC;
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
          color: #70EA6F; //green
        }

        .set-item-pending {
          color: #FAD74B;
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
        color: #3E92CC;
      }
    }

    .set-item:not(:first-child):before {
      content: "";
      position: absolute;
      top: 20px;
      height: 60px;
      background: #3E92CC;
      width: 1px;
    }

    .set-item:last-child:after {
      content: "";
      position: absolute;
      top: 20px;
      height: 60px;
      right: 0;
      background: #3E92CC;
      width: 1px;
    }
  }
}
</style>
