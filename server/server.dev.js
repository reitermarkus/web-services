const express = require('express')
const app = express()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('../webpack.config.dev.client')
const serverConfig = require('../webpack.config.dev.server')
const compiler = webpack([clientConfig, serverConfig])
const PORT = 3000

app.use(webpackDevMiddleware(compiler, {
  serverSideRender: true,
}))

app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))
app.use(webpackHotServerMiddleware(compiler))

app.listen(PORT)
