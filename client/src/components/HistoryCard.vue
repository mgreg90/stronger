<template>
<div class="card">
  <div class="card-body">
    <div class="header-container">
      <div class="title-container">
        <h5 class="card-title">{{workoutType}} - {{workoutDate}}</h5>
        <h6 class="card-subtitle mb-3 text-muted">
          <span class="clock">⏱</span> {{workoutDuration}}
        </h6>
      </div>
      <div class="menu">
        <a class="menu-link" @click="toggleMenuDisplay" v-on-clickaway="closeMenuDisplay">
          <i class="material-icons md-24">menu</i>
        </a>
        <div class="menu-list" v-if="isMenuDisplayed">
          <div class="menu-list-item">
            <a @click="goToWorkout">
              <i class="material-icons md-24">list</i>
              <p>Show Workout</p>
            </a>
          </div>
          <div class="menu-list-item">
            <a @click="goToQuickWorkoutFromTemplate">
              <i class="material-icons md-24">play_arrow</i>
              <p>Do this Workout</p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="exercise-summary-container">
      <div class="row-labels">
        <div>Name</div>
        <div>Sets</div>
        <div>Reps</div>
        <div>Weight</div>
        <div>Total Reps</div>
      </div>
      <div class="set-summary-container">
        <div
          v-for="exerciseExecution in workout.exerciseExecutions"
          :key="exerciseExecution.id"
          class="exercise-summary"
        >
          <div>{{nameFor(exerciseExecution)}}</div>
          <div>{{exerciseExecution.setExecutions.length}}</div>
          <div>{{repRangeFor(exerciseExecution)}}</div>
          <div>{{weightRangeFor(exerciseExecution)}}</div>
          <div>{{totalRepsFor(exerciseExecution)}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VueClickaway from 'vue-clickaway';
import { apiUtils, dateTimeUtils, stringUtils } from '@/utils';
import { WorkoutExecutionsRepeatController } from '@/api/v1/controllers';

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
  if (!completedSets?.[0]?.[field]) return [0, 0];
  let minVal = completedSets[0][field];
  let maxVal = completedSets[0][field];

  completedSets.forEach((set) => {
    if (set[field] < minVal) minVal = set[field];
    if (set[field] > maxVal) maxVal = set[field];
  });

  return [minVal, maxVal];
};

const createWorkoutExecutionRepeat = async (self) => {
  const response = await WorkoutExecutionsRepeatController.create(self.workout.id);

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
</script>

<style lang="scss" scoped>
.card {
  margin-top: 20px;
  width: 90%;
  border: 1px solid $light-blue;

  .header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title-container {
      .card-title {
        margin: auto 0;
        padding-bottom: 10px;
      }

      .card-subtitle {
        margin: auto 0;
        .clock {
          font-size: 1.5rem;
        }
      }
    }

    .menu {
      .menu-link {
        display: flex;
        justify-content: flex-end;
      }

      .menu-list {
        position: absolute;
        right: 20px;
        align-items: end;
        border: $light-blue solid 1px;
        padding: 2px 5px;
        border-radius: 5px;
        background-color: $grey;

        .menu-list-item {
          border-bottom: $light-blue 1px solid;
          margin: auto 0;

          a {
            display: flex;
            margin: 2px 0;

            i {
              margin-right: 5px;
              position: relative;
              top: 3px;
            }

            p {
              margin: 5px 10px 0 2px;
            }
          }
        }

        .menu-list-item:last-child {
          border: none;
        }
      }
    }
  }


  .exercise-summary-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .row-labels {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 80px;

      div {
        margin: 5px 10px 5px 0;
        text-align: end;
      }
    }

    .set-summary-container {
      display: flex;
      justify-content: flex-start;
      overflow-x: scroll;
      border: $light-blue solid 1px;

      .exercise-summary {
        border-right: $light-blue solid 1px;
        min-width: 175px;
        max-width: 175px;
        height: 100%;
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr 2fr;

        &:last-child {
          border-right: 0;
        }

        div {
          margin: auto 0;
          text-align: center;
        }
      }


    }
  }
}
</style>
