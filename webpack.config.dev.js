const baseConfig = require('./webpack.config.base.js')

module.exports = baseConfig.merge({
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'react-dev-utils/webpackHotDevClient',
    './client/index.js',
  ],
  devServer: {
    overlay: {
      warnings: false,
      errors: true,
    },
    stats: {
      assets: false,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: false,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
})
