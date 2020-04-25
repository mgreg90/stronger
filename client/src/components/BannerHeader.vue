<template>
  <div id="banner-header" >
    <h1>Stronger</h1>
  </div>
</template>

<script>
export default {
  name: 'BannerHeader',
  props: {
    text: String,
  },
};
</script>

<style scoped>

#banner-header {
  height: 33vh;
  color: #FFFAFF;
  background-color: #0A2463;
  display: grid;
}

#banner-header h1 {
  margin: auto;
  font-family: Nobile;
  font-size: 52px;
}
</style>
