<template>
<div class="set-list-item">
    <div class="item-order">
      #{{ index + 1 }}
    </div>
    <div class="item-column labels">
      <div>
        Weight
      </div>
      <div>
        Reps
      </div>
    </div>
    <div class="item-column inputs">
      <div class="input-container">
        <text-input
          v-model="set.weight"
          type="number"
          center-text
        />
      </div>
      <div class="input-container">
        <text-input
          v-model="set.reps"
          type="number"
          center-text
        />
      </div>
    </div>
    <div class="item-column units">
      <div>
        lbs
      </div>
      <div>
        #
      </div>
    </div>

  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue';

const props = {
  set: {},
  index: 0,
};

const components = {
  TextInput,
};

const methods = {
};

export default {
  name: 'SetListItem',
  props,
  components,
  methods,
};
</script>

<style lang="scss" scoped>
.set-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: $default-font;
  border-bottom: 1px solid $light-blue;
  margin: 0 20px;
  padding: 5px 0;

  .item-order {
    width: 20%;
    margin: auto;
    text-align: center;
    font-size: 32px;
  }

  .item-column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
  }

  .labels {
    width: 30%;
  }

  .inputs {
    width: 35%;

    .input-container {
      margin: 5px;
      width: 50%;
      align-self: center;
    }
  }

  .units {
    width: 15%;
  }

}
</style>
