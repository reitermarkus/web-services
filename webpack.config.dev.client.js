const devConfig = require('./webpack.config.dev.js')

const merge = require('webpack-merge')

module.exports = merge.smart(devConfig, {
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
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
})
