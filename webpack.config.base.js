const webpack = require('webpack')
const path = require('path')

const defaultConfig = {
  entry: './client/index.js',
  output: {
    filename: 'arriven.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}

module.exports.merge = (config) => {
  return {...defaultConfig, ...config}
}
