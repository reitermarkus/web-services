const baseConfig = require('./webpack.config.base.js')

const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = merge.smart(baseConfig, {
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
