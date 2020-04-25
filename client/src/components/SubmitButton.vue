<template>
  <div id="container">
    <button type="submit">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {},
};
</script>

<style scoped>
  #container {
    display: flex;
    flex-direction: row-reverse;
    padding: 15px 30px;
  }
  /* TODO fix button */
  /* next TODO make button create a user */
  #container button {
    color: #FFFAFF;
    background-color: #3E92CC;
    box-shadow: 1px 2px #D3D3D3; /* grey */
    font-family: Nobile;
    border: 1px solid #FFFAFF;
    border-radius: 10px;
    padding: 20px;
    width: 40%;
    /* height: 30px; */
  }
</style>
