const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9100/"
      }
    },
    host: "127.0.0.1",
    port: 8100
  },
  chainWebpack(config) {
    config.plugins.delete("prefetch");
    config.plugin("CompressionPlugin").use(CompressionPlugin);
  }
};
