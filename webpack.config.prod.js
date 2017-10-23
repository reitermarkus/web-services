const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const fs = require('fs-extra')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rootBuildPath = path.resolve(__dirname, 'dist')

fs.existsSync(rootBuildPath) || fs.mkdirSync(rootBuildPath)

fs.copy(path.resolve(__dirname, 'client', 'assets'), path.resolve(rootBuildPath), (err) => {
  if (err) {
    throw err
  }
})

module.exports = baseConfig.merge({
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'template', 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
})
