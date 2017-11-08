const express = require('express')
const router = express.Router()
const user = require('./schema/user')
const location = require('./schema/location')
const httpStatus = require('http-status-codes')

router.post('/user', (req, res, next) => {
  if (req.body.password === req.body.passwordConf) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    user.create(userData, (err) => {
      if (err) {
        return next(err)
      }
    })
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send('passwords do not match')
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

router.get('/api/location/list', (req, res) => {
  location.find({}, (err, locations) => {
    res.status(httpStatus.OK).send(JSON.stringify(locations))
  })
})

router.post('/api/location/find', (req, res) => {
  location.find({
    keywords: {
      '$in': req.body.keywords.split(' '),
    },
  }, (err, locations) => {
    res.status(httpStatus.OK).send(JSON.stringify(locations))
  })
})

router.post('/api/location/add', (req, res, next) => {
  const locationData = {
    name: req.body.name,
    keywords: req.body.keywords.split('\n'),
    lat: req.body.lat,
    lon: req.body.lon,
    imgs: req.body.imgs.split('\n'),
  }

  location.create(locationData, (err) => {
    if (err) {
      return next(err)
    }
  })

  res.status(httpStatus.OK).send('ok')
})

router.post('/api/location/del', (req, res, next) => {
  location.find({name: req.body.name}).remove().exec()

  res.status(httpStatus.OK).send('ok')
})

module.exports = router
