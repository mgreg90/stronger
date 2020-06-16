module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/variables/_global.scss";
        @import "@/scss/modules/_global.scss";
        @import "@/scss/mixins/_global.scss";`
      }
    }
  }
};
