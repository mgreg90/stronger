<template>
  <div :class="{'textInput-component': true, inline}">
    <input
      :type="type"
      :class="{error: hasError, inline}"
      :name="name"
      :placeholder="label"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <p v-if="error !== 'NO_ERROR'">{{error}}</p>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    name: String,
    error: {
      type: String,
      default: 'NO_ERROR',
    },
    type: {
      type: String,
      default: 'text',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  computed: {
    hasError() {
      return this.$props.error && this.$props.error !== 'NO_ERROR';
    },
  },
};
</script>

<style lang="scss" scoped>
.textInput-component.inline {
  padding: 2px;

  input {
    padding: 0;
    text-align: center;
  }
}
.textInput-component {
  padding: 0px 30px 0px 30px;

  input {
    width: calc(100% - 24px);
    margin: 0;
    font-family: $default-font;
    border: 1px solid  $light-blue;
    color: $light-blue;
    border-radius: 10px;
    padding: 12px;
    height: 30px;
  }

  input.error {
    border: 1px solid #d8315b;
  }

  input::placeholder {
    color: $grey;
  }

  p {
    min-height: 18px;
    margin: 10px 0 0px 12px;
    color: #d8315b;
    font-family: $default-font;
    font-size: 12px;
  }
}
</style>
