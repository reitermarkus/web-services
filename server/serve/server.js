const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const http = require('http')
const https = require('https')
const routes = require('./express-routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fs = require('fs')
const ServerRenderer = require(path.resolve(__dirname, 'serverRenderer.js')).default
const PORT = process.env.PORT || 3000
const SSL_PORT = process.env.SSL_PORT || 3043
const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const MONGO_DB = process.env.MONGO_DB || 'arriven'

app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(ServerRenderer())

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
}

// Configure .env
require('dotenv').config()

mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DB}`)
const db = mongoose.connection

db.once('open', () => {
  console.log(`connected to db: ${MONGO_DB}`) // eslint-disable-line no-console
})

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', routes)

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

