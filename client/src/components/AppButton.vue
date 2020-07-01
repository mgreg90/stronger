<template>
  <button
    type="button"
    @click="handleClick"
    :class="{
      'app-button': true,
      btn: true,
      'btn-primary': true,
      'btn-block': block
    }"
  >
    {{label}}
  </button>
</template>

<script>
const props = {
  label: String,
  block: {
    type: Boolean,
    default: false,
  },
};

const methods = {
  handleClick(evt) {
    evt.preventDefault();
    this.$emit('clicked');
  },
};

export default {
  name: 'AppButton',
  props,
  methods,
};
</script>

<style scoped lang="scss">
@import "bootstrap";

.app-button {
  padding: 16px 24px;

  &.btn-primary {
    /*
      button-variant(
        $background,
        $border,
        $hover-background,
        $hover-border,
        $active-background,
        $active-border
      )
    */
    @include button-variant(
      $light-blue,
      $light-blue,
      darken($light-blue, 10%),
      darken($light-blue, 10%),
      $active-background: darken($light-blue, 20%),
      $active-border: darken($light-blue, 20%));
    background: $light-blue;

    &:active {
      background: darken($light-blue, 20%);
    }
  }

  &.btn-block {
    border-radius: 0;
  }
}
</style>
