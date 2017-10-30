const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const fs = require('fs-extra')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const rootBuildPath = path.resolve(__dirname, 'dist')

fs.existsSync(rootBuildPath) || fs.mkdirSync(rootBuildPath)

fs.copy(path.resolve(__dirname, 'server', 'serve'), path.resolve(rootBuildPath), (err) => {
  if (err) {
    throw err
  }
})

const prodConfig = {
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [require('autoprefixer')()],
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
    }),
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
  ],
}

const config = {
  client: merge.smart(baseConfig.client, prodConfig),
  server: merge.smart(baseConfig.server, prodConfig),
}

module.exports = [config.client, config.server]
