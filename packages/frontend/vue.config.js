module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9100/'
      }
    },
    host: '127.0.0.1',
    port: 8100
  }
};
