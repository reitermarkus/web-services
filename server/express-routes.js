const express = require('express')
const router = express.Router()
const httpStatus = require('http-status-codes')
const curl = require('curl')
const user = require('./model/User')
const Location = require('./model/Location')
const Pixabay = require('./model/Pixabay')
const Fixer = require('./model/Fixer')

router.post('/user', user.userCreate)
router.post('/login', user.userLogin)
router.post('/user/info', user.userInfo)
router.post('/user/favourites', user.userFavourites)

router.get('/api/location/list', Location.listLocations)
router.get('/api/location/get/:id', Location.findById)
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
