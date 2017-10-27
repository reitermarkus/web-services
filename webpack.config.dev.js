const baseConfig = require('./webpack.config.base.js')

const webpack = require('webpack')
const merge = require('webpack-merge')

const devConfig = {
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
}

const config = merge.smart(baseConfig, {
  client: merge.smart(devConfig, {
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
  }),
  server: devConfig,
})

module.exports = [config.client, config.server]
