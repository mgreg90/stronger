<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;

  .toasted .toasted-primary, .toasted.toasted-primary {
    justify-content: flex-start;
  }

  .toasted p {
    font-family: $default-font;
    margin-top: 20px;
  }
}
</style>

<script>
</script>
