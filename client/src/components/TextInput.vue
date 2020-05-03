<template>
  <div class="container">
    <input
      :type="type"
      :class="{error: !!error}"
      :name="name"
      :placeholder="label"
      v-on:input="$emit('input', $event.target.value)"
    >
    <p>{{error}}</p>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: String,
    name: String,
    error: String,
    type: {
      type: String,
      default: 'text',
    },
  },
};
</script>

<style scoped>
  .container {
    display: grid;
    padding: 0px 30px 10px 30px;
  }

  .container input {
    margin: 0;
    font-family: Nobile;
    border: 1px solid  #3E92CC;
    color: #3E92CC;
    border-radius: 10px;
    padding: 12px;
    height: 30px;
  }

  .container input.error {
    border: 1px solid #d8315b;
  }

  .container input::placeholder {
    color: #D3D3D3;
  }

  .container p {
    min-height: 18px;
    margin: 10px 0 0px 12px;
    color: #d8315b;
    font-family: Nobile;
    font-size: 12px;
  }
</style>
