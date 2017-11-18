const express = require('express')
const router = express.Router()
const httpStatus = require('http-status-codes')
const curl = require('curl')
const user = require('./schema/user')
const location = require('./schema/location')
const pixabay = require('./schema/pixabay')

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

router.post('/api/location/add', (req, res) => {
  const locationData = {
    name: req.body.name,
    keywords: req.body.keywords.split('\n'),
    lat: req.body.lat,
    lon: req.body.lon,
    imgs: req.body.imgs.split('\n'),
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
    keywords: req.body.keywords.split('\n'),
    lat: req.body.lat,
    lon: req.body.lon,
    imgs: req.body.imgs.split('\n'),
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

  res.status(httpStatus.OK).send('ok')
})

router.post('/api/pixabay/find', (req, res) => {
  pixabay.find({}, (err, result) => {
    if (err) {
      res.status(httpStatus.OK).send('"not ok"')
    } else {
      res.status(httpStatus.OK).send(JSON.stringify(result))
    }
  })
})

router.post('/api/pixabay/cache', (req, res) => {
  pixabay.create(req.body, (err) => {
    if (err) {
      res.status(httpStatus.OK).send('not ok')
    } else {
      res.status(httpStatus.OK).send('ok')
    }
  })
})

router.get('/api/pixabay/del', (req, res) => {
  pixabay.findOneAndRemove({query: req.query.q}, (err) => {
    if (err) {
      res.status(httpStatus.OK).send('not ok')
    } else {
      res.status(httpStatus.OK).send('ok')
    }
  })

  res.status(httpStatus.OK).send('ok')
})

router.post('/api/curl', (req, res) => {
  curl.get(req.body.url, req.body.opts, (err, resp, data) => {
    res.status(httpStatus.OK).send(data)
  })
})

module.exports = router
