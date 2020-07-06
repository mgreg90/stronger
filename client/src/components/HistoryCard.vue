<template>
<div class="history-card shadow">
  <div class="history-card-date">
    <h2>{{ date }}</h2>
  </div>
</div>
</template>

<script>
const props = {
  date: {
    type: String,
    default: 'July 2, 2020',
  },
};

const components = {
};

const methods = {
};

export default {
  name: 'HistoryCard',
  props,
  components,
  methods,
};
</script>

<style lang="scss" scoped>
.history-card {
  margin: 10px;
  height: 300px;
  width: calc(100% - 20px);
  background-color: white;
  border-radius: 5px;

  .history-card-date {
    text-align: center;
    margin: 10px;

    h2 {
      font-size: 1.75em;
    }
  }
}
</style>
