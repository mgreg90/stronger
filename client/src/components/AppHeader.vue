<template>
  <div class="banner-header" >
    <div class="back-button" :class="{hide: !backButton}" @click="handleBackClick">
      <i class="material-icons md-24">arrow_back_ios</i>
    </div>
    <h1>{{text}}</h1>
  </div>
</template>

<script>
const props = {
  text: {
    type: String,
    default: 'Stronger',
  },
  backButton: {
    type: Boolean,
    default: true,
  },
  backButtonPath: {
    type: String,
    default: null,
  },
};

const components = {
};

const methods = {
  handleBackClick() {
    this.$emit('onBackClicked');

    if (this.backButtonPath) {
      this.$router.push(this.backButtonPath);
    } else {
      this.$router.go(-1);
    }
  },
};

export default {
  name: 'BannerHeader',
  props,
  components,
  methods,
};
</script>

<style scoped lang="scss">

.banner-header {
  height: 60px;
  color: $white;
  background-color: #0A2463;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: auto 0;
}

.banner-header h1 {
  margin: 12px 0 0 15px;
  font-family: $default-font;
  font-size: 30px;
}

.banner-header .back-button {
  margin: 15px -15px 0px 15px;
  cursor: pointer;
}

.banner-header .hide {
  display: none;
}

</style>
