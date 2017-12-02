const express = require('express')
const router = express.Router()
const httpStatus = require('http-status-codes')
const curl = require('curl')
const user = require('./model/User')
const Location = require('./model/Location')
const Pixabay = require('./model/Pixabay')
const Fixer = require('./model/Fixer')

router.post('/user', (req, res) => {
  if (req.body.password === req.body.passwordConf) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    user.create(userData, (err) => {
      if (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
      } else {
        res.status(httpStatus.CREATED).send('user created successfully')
      }
    })
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('passwords do not match')
  }
})

router.post('/login', (req, res) => {
  user.login(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('wrong email or password')
    } else {
      res.status(httpStatus.OK).send('login successfull')
    }
  })
})

router.get('/api/location/list', Location.listLocations)
router.get('/api/location/find/:keywords', Location.findLocations)
router.post('/api/location', Location.addLocation)
router.put('/api/location', Location.updateLocation)
router.delete('/api/location/:name', Location.deleteLocation)

router.get('/api/pixabay/find/:query', Pixabay.findImages)

router.get('/api/fixer/:base', Fixer.ratesForBase)

router.post('/api/curl', (req, res) => {
  curl.get(req.body.url, req.body.opts, (err, resp, data) => {
    res.status(httpStatus.OK).send(data)
  })
})

module.exports = router
