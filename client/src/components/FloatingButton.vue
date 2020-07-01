<template>
  <button class="floating-button btn btn-dark" @click="handleClick">
    <i class="material-icons md-36">add</i>
  </button>
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

<style scoped lang="scss">
.floating-button {
  border-radius: 100%;
  width: 70px;
  height: 70px;

  i {
    margin-top: 6px;
  }
}
</style>
