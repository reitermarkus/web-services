const express = require('express')
const path = require('path')
const app = express()
const ServerRenderer = require(path.resolve(__dirname, 'serverRenderer.js')).default
const PORT = 3000

app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(ServerRenderer())

app.listen(PORT)
