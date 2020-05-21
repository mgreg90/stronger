<template>
  <div class="app-button-container" :class="{ [type]: true}">
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
  .app-button-container {
    display: flex;
    flex-direction: row-reverse;
  }

  .app-button-container.submit {
    padding: 0px 30px 30px 30px;
  }

  .app-button-container.wide-bottom {
        justify-self: flex-start;
  }

  .app-button-container button {
    color: #FFFAFF;
    background-color: #3E92CC;
    box-shadow: 1px 2px #D3D3D3; /* grey */
    font-family: Nobile;
    border: 1px solid #FFFAFF;
    border-radius: 10px;
    padding: 20px;
  }

  .app-button-container .submit {
    width: 40%;
  }

  .app-button-container .wide-floating {
    width: 100%;
    margin: 15px 20px;
  }

  .app-button-container .wide-bottom {
    border-radius: 0;
    width: 100%;
    border: 0;
  }
</style>
