<template>
  <div id="container">
    <h2 id="form-header">{{ text }}</h2>
  </div>
</template>

<script>
export default {
  name: 'FormHeader',
  props: {
    text: String,
  },
};
</script>

<style scoped>
  #container {
    display: grid;
  }

  #form-header {
    margin: 30px auto;
    font-family: Nobile;
  }
</style>
