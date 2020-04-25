<template>
  <div id="container">
    <input id="my-input" type="text" name="myInput" :placeholder="label">
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: String,
  },
};
</script>

<style scoped>
  #container {
    display: grid;
    padding: 15px 30px;
  }

  #container input {
    margin: 0;
    font-family: Nobile;
    border: 1px solid  #3E92CC;
    border-radius: 10px;
    padding: 12px;
    /* width: 100%; */
    height: 30px;
  }

  #container input::placeholder {
    color: #3E92CC;
  }
</style>
