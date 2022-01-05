module.exports = {
  outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      }
    }
  }
}
