<template>
  <div class="floating-button-container" >
    <button @click="handleClick">
      <i class="material-icons md-60">add</i>
    </button>
  </div>
</template>

<script>
const props = {

};

const components = {
};

const methods = {
  handleClick(evt) {
    evt.preventDefault();
    this.$emit('clicked');
  },
};

export default {
  name: 'FloatingButton',
  props,
  components,
  methods,
};
</script>

<style scoped>
  .floating-button-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .floating-button-container i {
    color: #fffaff;
    font-size: 40px;
  }

  .floating-button-container button {
    border: 0;
    padding: 10px;
    background-color: #1e1b18;
    border-radius: 100%;
    margin: 20px;
    box-shadow: 5px 5px 5px #a0a0a0;
  }

</style>
