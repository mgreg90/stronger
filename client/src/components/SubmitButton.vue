<template>
  <div id="container">
    <button type="submit" v-on:click="handleSubmit">{{ label }}</button>
  </div>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    label: String,
    // path: String,
  },
  methods: {
    handleSubmit(evt) {
      evt.preventDefault();
      this.$emit('submitted');
    },
  },
};
</script>

<style scoped>
  #container {
    display: flex;
    flex-direction: row-reverse;
    padding: 0px 30px 30px 30px;
  }

  #container button {
    color: #FFFAFF;
    background-color: #3E92CC;
    box-shadow: 1px 2px #D3D3D3; /* grey */
    font-family: Nobile;
    border: 1px solid #FFFAFF;
    border-radius: 10px;
    padding: 20px;
    width: 40%;
  }
</style>
