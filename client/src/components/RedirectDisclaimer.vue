<template>
  <p class="redirect-disclaimer">{{messageText}} <a :href="href">{{linkText}}</a></p>
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

<style scoped>
  .redirect-disclaimer {
    position: absolute;
    bottom: 0;
    padding: 0px 30px;
    font-family: Nobile;
    font-size: 12px;
    margin-bottom: 30px;
  }

  .redirect-disclaimer a {
    text-decoration: none;
    color: #3E92CC;
  }
</style>
