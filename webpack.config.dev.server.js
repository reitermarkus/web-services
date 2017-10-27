const devConfig = require('./webpack.config.dev.js')

const merge = require('webpack-merge')
const path = require('path')

module.exports = merge.smart(devConfig, {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: './server/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
})
