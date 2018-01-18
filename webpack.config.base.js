const path = require('path')
const merge = require('webpack-merge')

const Dotenv = require('dotenv-webpack')

const baseConfig = {
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
          'css-loader',
          'sass-loader',
          'resolve-url-loader',
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000',
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
    new Dotenv(),
  ],
}

module.exports = {
  client: merge.smart(baseConfig, {
    name: 'client',
    target: 'web',
    entry: './client/index.js',
    output: {
      filename: 'arriven.bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  }),
  server: merge.smart(baseConfig, {
    name: 'server',
    target: 'node',
    entry: './server/serverRenderer.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'serverRenderer.js',
      libraryTarget: 'commonjs2',
    },
  }),
}
