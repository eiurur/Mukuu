// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://0.0.0.0:9100/"
      }
    },
    host: "0.0.0.0",
    port: 8100
  },
  chainWebpack(config) {
    config.plugins.delete("prefetch");
    // config.plugin("CompressionPlugin").use(CompressionPlugin);
  }
};
