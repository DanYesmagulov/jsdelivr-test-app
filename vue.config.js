const path = require('path')

module.exports = {
  publicPath: '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/_variables.scss'),
        path.resolve(__dirname, './src/styles/_media.scss'),
        path.resolve(__dirname, './src/styles/_mixins.scss'),
      ],
    },
  },
}
