<template>
  <p class="redirect-disclaimer">
    {{messageText}} <router-link :to="href">{{linkText}}</router-link>
  </p>
</template>

<script>
export default {
  name: 'FormHeader',
  props: {
    messageText: String,
    linkText: String,
    href: String,
  },
};
</script>

<style scoped lang="scss">
  .redirect-disclaimer {
    position: absolute;
    bottom: 0;
    padding: 0px 30px;
    font-family: $default-font;
    font-size: 12px;
    margin-bottom: 15px;
  }

  .redirect-disclaimer a {
    text-decoration: none;
    color: $light-blue;
  }
</style>
