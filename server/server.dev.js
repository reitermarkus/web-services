const express = require('express')
const app = express()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const config = require('../webpack.config.dev')
const compiler = webpack(config)
const routes = require('./express-routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = 3000

mongoose.connect('mongodb://localhost/arriven')
const db = mongoose.connection

db.once('open', () => {
  console.log('connected to db: arriven') // eslint-disable-line no-console
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(webpackDevMiddleware(compiler, {
  serverSideRender: true,
}))

app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))
app.use(webpackHotServerMiddleware(compiler))

app.listen(PORT, (error) => {
  if (error) {
    console.error(error) // eslint-disable-line no-console
  } else {
    console.info(`Server started at http://127.0.0.1:${PORT}/`) // eslint-disable-line no-console
  }
})
