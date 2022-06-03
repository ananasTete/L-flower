module.exports = {
  outputDir: './build',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      }
    }
  }
}
