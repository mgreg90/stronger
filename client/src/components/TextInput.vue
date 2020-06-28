<!--// <template>
//   <div :class="{'textInput-component': true, inline}">
//     <i v-if="icon" class="material-icons md-36">{{ icon }}</i>
//     <input
//       :type="type"
//       :class="{error: hasError, inline, hasIcon: !!icon}"
//       :name="name"
//       :placeholder="label"
//       :value="value"
//       @input="$emit('input', $event.target.value)"
//       @focus="$event.target.select()"
//     >
//     <p v-if="error !== 'NO_ERROR'">{{error}}</p>
//   </div>
// </template> -->
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
          <i class="material-icons md-36">{{ leftIcon }}</i>
        </span>
      </div>
      <input
        :type="type"
        :class="{
          'form-control': true,
          'no-border-left': leftIcon,
          'no-border-right': rightIcon
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
    padding: 0px 30px 0px 30px;

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
    }

    .has-error input {
      color: $red;
      border-color: $red;
    }

    input.no-border-left {
      border-left: none;
    }

    input.no-border-right {
      border-right: none;
    }

    .error-msg {
    min-height: 18px;
    margin: 10px 0 0px 12px;
    color: $red;
    font-family: $default-font;
    font-size: 12px;
    }
  }
// .textInput-component.inline {
//   padding: 2px;

//   input {
//     padding: 0;
//     text-align: center;
//   }
// }
// .textInput-component {
//   padding: 0px 30px 0px 30px;
//   position: relative;

//   i {
//     position: absolute;
//     top: 16px;
//     left: 42px;
//     color: $light-blue;
//   }

//   input {
//     width: calc(100% - 24px);
//     margin: 0;
//     font-family: $default-font;
//     border: 1px solid  $light-blue;
//     color: $light-blue;
//     border-radius: 10px;
//     padding: 12px;
//     height: 30px;
//   }

//   input.hasIcon {
//     text-indent: 30px;
//   }

//   input.inline {
//     width: 80px;
//   }

//   input.error {
//     border: 1px solid #d8315b;
//   }

//   input::placeholder {
//     color: $grey;
//   }

//   p {
//     min-height: 18px;
//     margin: 10px 0 0px 12px;
//     color: #d8315b;
//     font-family: $default-font;
//     font-size: 12px;
//   }
// }
</style>
