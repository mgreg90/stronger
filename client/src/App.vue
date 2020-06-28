<template>
  <div id="app">
    <router-view/>
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
</script>
