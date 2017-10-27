const baseConfig = require('./webpack.config.base.js')
const path = require('path')
const webpack = require('webpack')

module.exports = baseConfig.merge({
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: './server/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: 'http://localhost:3000/',
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
})
