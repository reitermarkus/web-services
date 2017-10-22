const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
})

const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'react-dev-utils/webpackHotDevClient',
    './client/index.js'
  ],
  output: {
    filename: 'arriven.bundle.js',
    path: path.resolve(__dirname, 'dist'),
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
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [HtmlWebpackPluginConfig],
}
