<template>
  <div class="textinput-container">
    <div
      :class="{
        'input-group': true,
        'has-error': error && error != 'NO_ERROR'
      }"
    >
      <div v-if="leftIcon" class="input-group-prepend icon left-icon">
        <span class="input-group-text">
          <i class="material-icons md-24">{{ leftIcon }}</i>
        </span>
      </div>
      <input
        :type="type"
        :class="{
          'form-control': true,
          'no-border-left': leftIcon,
          'no-border-right': rightIcon,
          'center-text': centerText,
        }"
        :placeholder="label"
        :aria-label="label"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="$event.target.select()"
      >
      <div v-if="rightIcon" class="input-group-prepend icon right-icon">
        <span class="input-group-text">
          <i class="material-icons md-36">{{ rightIcon }}</i>
        </span>
      </div>
    </div>
    <p class="error-msg" v-if="error !== 'NO_ERROR'">{{error}}</p>
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
    leftIcon: {
      type: String,
      default: null,
    },
    rightIcon: {
      type: String,
      default: null,
    },
    centerText: {
      type: Boolean,
      default: false,
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
  .textinput-container {

    .icon span {
      border: 1px solid $light-blue;
      color: $light-blue;
      background: inherit;
    }

    .has-error .icon span {
      color: $red;
      border-color: $red;
    }

    .left-icon span {
      border-right: none;
    }

    .right-icon span {
      border-left: none;
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }

    input {
      border: 1px solid $light-blue;
      color: $light-blue;

      &.center-text {
        text-align: center;
      }

      &.no-border-left {
        border-left: none;
      }

      &.no-border-right {
        border-right: none;
      }
    }

    .has-error input {
      color: $red;
      border-color: $red;
    }

    .error-msg {
    min-height: 18px;
    margin: 10px 0 0px 12px;
    color: $red;
    font-family: $default-font;
    font-size: 12px;
    }
  }
</style>
