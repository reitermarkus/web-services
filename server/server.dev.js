const express = require('express')
const app = express()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('../webpack.config.dev')
const serverConfig = require('../webpack.config.server.dev')
const compiler = webpack([clientConfig, serverConfig])
const PORT = 3000

app.use(webpackDevMiddleware(compiler, {
  publicPath: serverConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
}))

app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))
app.use(webpackHotServerMiddleware(compiler))

app.listen(PORT)
