<template>
  <div class="button-container" :class="{ [type]: true}">
    <button :class="{ [type]: true }" type="submit" @click="handleClick">{{ label }}</button>
  </div>
</template>

<script>
const props = {
  label: String,
  type: {
    type: String,
    default: 'submit',
  },
  onClick: {
    type: Function,
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

<style scoped>
  .button-container {
    display: flex;
    flex-direction: row-reverse;
  }

  .button-container.submit {
    padding: 0px 30px 30px 30px;
  }

  .button-container.wide-bottom {
        justify-self: flex-start;
  }

  .button-container button {
    color: #FFFAFF;
    background-color: #3E92CC;
    box-shadow: 1px 2px #D3D3D3; /* grey */
    font-family: Nobile;
    border: 1px solid #FFFAFF;
    border-radius: 10px;
    padding: 20px;
  }

  .button-container .submit {
    width: 40%;
  }

  .button-container .wide-floating {
    width: 100%;
    margin: 0px 20px;
  }

  .button-container .wide-bottom {
    border-radius: 0;
    width: 100%;
    border: 0;
  }
</style>
