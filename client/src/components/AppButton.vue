<template>
  <!-- <div class="app-button-container" :class="{ [type]: true}">
    <button :class="{ [type]: true }" type="submit" @click="handleClick">{{ label }}</button>
  </div> -->
  <button
    type="button"
    @click="handleClick"
    class="app-button btn btn-primary"
  >
    {{label}}
  </button>
</template>

<script>
const props = {
  label: String,
  type: {
    type: String,
    default: 'submit',
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
}
  // .app-button-container {
  //   display: flex;
  //   flex-direction: row-reverse;
  // }

  // .app-button-container.submit {
  //   padding: 0px 30px 30px 30px;
  // }

  // .app-button-container.wide-bottom {
  //       justify-self: flex-start;
  // }

  // .app-button-container button {
  //   color: $white;
  //   background-color: $light-blue;
  //   box-shadow: 1px 2px $grey; /* grey */
  //   font-family: $default-font;
  //   border: 1px solid $white;
  //   border-radius: 10px;
  //   padding: 20px;
  // }

  // .app-button-container .submit {
  //   width: 40%;
  // }

  // .app-button-container .wide-floating {
  //   width: 100%;
  //   margin: 15px 20px;
  // }

  // .app-button-container .wide-bottom {
  //   border-radius: 0;
  //   width: 100%;
  //   border: 0;
  // }
</style>
