const baseConfig = require('./webpack.config.base.js')
const webpack = require('webpack')

module.exports = baseConfig.merge({
  name: 'client',
  target: 'web',
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'react-dev-utils/webpackHotDevClient',
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server',
    './client/index.js',
  ],
  output: {
    filename: 'arriven.bundle.js',
    path: __dirname,
    publicPath: 'http://localhost:3000/',
  },
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
})
