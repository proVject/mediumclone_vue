const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig(() => {
  const configs = {
    publicPath: '/mediumclone_vue/',
    transpileDependencies: true
  };
  // if (process.env.IS_GITHUB) {
  //   configs.publicPath = "/mediumclone_vue/";
  // }
  return configs;
});
