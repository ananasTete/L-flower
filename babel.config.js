module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: '@nutui/nutui',
        libraryDirectory: 'dist/packages/_es',
        camel2DashComponentName: false
      },
      'nutui3-vue'
    ]
  ]
}
