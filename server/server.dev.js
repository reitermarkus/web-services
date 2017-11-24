const express = require('express')
const cors = require('cors')
const http = require('http')
const https = require('https')
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
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3000
const SSL_PORT = process.env.SSL_PORT || 3043

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
}

mongoose.connect('mongodb://localhost/arriven')
const db = mongoose.connection

db.once('open', () => {
  console.log('connected to db: arriven') // eslint-disable-line no-console
})

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

app.use(webpackDevMiddleware(compiler, {
  serverSideRender: true,
}))

app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))
app.use(webpackHotServerMiddleware(compiler))

http.createServer(app).listen(PORT, (error) => {
  if (error) {
    console.error(error) // eslint-disable-line no-console
  } else {
    console.info(`Server started at http://127.0.0.1:${PORT}/`) // eslint-disable-line no-console
  }
})

https.createServer(sslOptions, app).listen(SSL_PORT, (error) => {
  if (error) {
    console.error(error) // eslint-disable-line no-console
  } else {
    console.info(`Server started at https://127.0.0.1:${SSL_PORT}/`) // eslint-disable-line no-console
  }
})
