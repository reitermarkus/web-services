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

router.get('/viewloc', (req, res) => {
  location.find({}, (err, locations) => {
    res.status(httpStatus.OK).send(JSON.stringify(locations))
  })
})

router.post('/findloc', (req, res) => {
  console.log(req.body)
  location.find({
    keywords: {
      '$in': req.body.keywords.split(' '),
    },
  }, (err, locations) => {
    res.status(httpStatus.OK).send(JSON.stringify(locations))
  })
})

router.get('/addloc', (req, res) => {
  res.sendFile(__dirname + '/template/addloc.html')
})

router.post('/writeloc', (req, res, next) => {
  const locationData = {
    name: req.body.name,
    keywords: req.body.keywords.split('\r\n'),
    lat: req.body.lat,
    lon: req.body.lon,
    imgs: req.body.imgs.split('\r\n'),
  }

  location.create(locationData, (err) => {
    if (err) {
      return next(err)
    }
  })

  res.status(httpStatus.OK).send('ok')
})

module.exports = router
