<template>
  <div id="app">
    <router-view />
    <bottom-nav v-if="!skipBottomNav"/>
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
  font-family: $default-font;

  // make content unselectable
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .toasted .toasted-primary, .toasted.toasted-primary {
    justify-content: flex-start;
  }

  .toasted p {
    margin-top: 20px;
  }
}
</style>

<script>
import { BottomNav } from '@/components';

const components = {
  BottomNav,
};

const computed = {
  skipBottomNav() {
    return this.$route.meta?.skipNav;
  },
};

export default {
  name: 'App',
  components,
  computed,
};
</script>
