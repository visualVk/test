module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:35001/',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      },
    }
  }
}