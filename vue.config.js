module.exports = {
  outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views',
        assets: '@/assets',
        components: '@/components',
        global: '@/global'
      }
    }
  }
}
