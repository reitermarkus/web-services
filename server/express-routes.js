const express = require('express')
const router = express.Router()
const httpStatus = require('http-status-codes')
const curl = require('curl')
const user = require('./schema/user')
const location = require('./schema/location')
const Pixabay = require('./model/Pixabay')
const fixerModel = require('./model/Fixer')

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
  if (req.body.keywords === '') {
    res.status(httpStatus.OK).send('[]')
    return
  }

  let data = req.body.keywords.split(',').map(e => {
    return new RegExp('.*?' + e.trim() + '.*?', 'i')
  })

  location.find({
    '$or' : [
      {keywords: {'$in': data}},
      {name: {'$in': data}},
    ],
  }, (err, locations) => {
    res.status(httpStatus.OK).send(JSON.stringify(locations))
  })
})

router.post('/api/location/add', (req, res) => {
  const locationData = {
    name: req.body.name,
    lat: req.body.lat,
    lon: req.body.lon,
    weatherid: req.body.weatherid,
    keywords: req.body.keywords.split('\n'),
  }

  location.create(locationData, (err) => {
    if (err) {
      res.status(httpStatus.OK).send('not ok')
    } else {
      res.status(httpStatus.OK).send('ok')
    }
  })
})

router.post('/api/location/update', (req, res) => {
  const locationData = {
    name: req.body.name,
    lat: req.body.lat,
    lon: req.body.lon,
    weatherid: req.body.weatherid,
    keywords: req.body.keywords.split('\n'),
  }

  location.update({_id: req.body._id}, {
    '$set': locationData,
  }, (err, stats) => {
    if (stats.n === 1) {
      res.status(httpStatus.OK).send('ok')
    } else {
      res.status(httpStatus.OK).send('not ok')
    }
  })
})

router.post('/api/location/del', (req, res) => {
  location.findOneAndRemove({name: req.body.name}, (err) => {
    if (err) {
      res.status(httpStatus.OK).send('not ok')
    } else {
      res.status(httpStatus.OK).send('ok')
    }
  })
})

router.get('/api/pixabay/find/:query', Pixabay.find)

router.get('/api/fixer/get', (req, res) => {
  (new fixerModel(req, res)).request()
})

router.post('/api/curl', (req, res) => {
  curl.get(req.body.url, req.body.opts, (err, resp, data) => {
    res.status(httpStatus.OK).send(data)
  })
})

module.exports = router
