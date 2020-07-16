<template>
<nav class="navbar navbar-light bg-light fixed-bottom">
  <ul>
    <li ref="history" class="nav-item">
      <a
        :class="{
          'nav-link': true,
          active: isActive('history'),
        }"
        @click="goToHistory"
      >
        <i class="material-icons md-36">history</i>
      </a>
    </li>
    <li ref="workouts" class="nav-item">
      <a
        :class="{
          'nav-link': true,
          active: isActive('workouts'),
        }"
        @click="goToWorkouts"
      >
        <i class="material-icons md-36">fitness_center</i>
      </a>
    </li>
    <li ref="stats" class="nav-item">
      <a
        :class="{
          'nav-link': true,
          active: isActive('stats'),
        }"
        @click="goToStats"
      >
        <i class="material-icons md-36">insert_chart_outlined</i>
      </a>
    </li>
    <li ref="profile" class="nav-item">
      <a
        :class="{
          'nav-link': true,
          active: isActive('profile'),
        }"
        @click="goToProfile"
      >
        <i class="material-icons md-36">account_circle</i>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
import { stringUtils } from '@/utils';

const props = {
};

const data = () => ({
  selected: {
    type: String,
    default: 'history',
  },
  historyUrlPath: {
    type: String,
    default: '',
  },
  workoutsUrlPath: {
    type: String,
    default: '',
  },
  statsUrlPath: {
    type: String,
    default: '',
  },
  profileUrlPath: {
    type: String,
    default: '',
  },
});

const components = {
};

const setPreviousUrl = (self, path) => {
  const currentSelection = stringUtils.pathStart(path);
  const key = `${currentSelection}UrlPath`;
  self.$set(self, key, path);
};

const clearPreviousUrl = (self, path) => {
  const currentSelection = stringUtils.pathStart(path);
  const key = `${currentSelection}UrlPath`;
  self.$set(self, key, '');
};

const goTo = (self, path) => {
  const previousUrlPath = self[`${path}UrlPath`];

  if (previousUrlPath.length) {
    self.$router.push(previousUrlPath);
  } else {
    self.$router.push(`/${path}`);
  }
};

const methods = {
  goToHistory() {
    goTo(this, 'history');
  },
  goToWorkouts() {
    goTo(this, 'workouts');
  },
  goToStats() {
    goTo(this, 'stats');
  },
  goToProfile() {
    goTo(this, 'profile');
  },
  isActive(ref) {
    return this.selected === ref;
  },
};

function mounted() {
  const pathStart = stringUtils.pathStart(this.$route.path);
  this.$set(this, 'selected', pathStart || 'history');
}

const watch = {
  $route(to, from) {
    const toPathStart = stringUtils.pathStart(to.path);

    if (this.selected === toPathStart) return;

    if (this.$route.query?.clearTabHistory) {
      clearPreviousUrl(this, from.fullPath);
    } else {
      setPreviousUrl(this, from.fullPath);
    }

    this.$set(this, 'selected', toPathStart);
  },
};

export default {
  name: 'BottomNav',
  props,
  data,
  components,
  methods,
  mounted,
  watch,
};
</script>

<style lang="scss" scoped>
nav {
  height: 60px;

  ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;

    a {
      color: $grey;

      &.active {
        color: $light-blue;
      }
    }

  }
}
</style>
