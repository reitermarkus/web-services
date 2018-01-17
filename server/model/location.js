const mongoose = require('mongoose')
const Schema = mongoose.Schema

const httpStatus = require('http-status-codes')

let schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  lat: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  lon: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  weatherid: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  countrycode: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  currency: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  keywords: {
    type: Array,
    unique: false,
    required: true,
    trim: true,
  },
})

schema.static('listLocations', (req, res) => {
  mongoose.model('Location').find({}, (err, locations) => {
    res.status(httpStatus.OK).send(JSON.stringify(locations))
  })
})

schema.static('findById', (req, res) => {
  if (req.params.id === '') {
    res.status(httpStatus.OK).send('[]')
    return
  }

  mongoose.model('Location').find({
    '_id' : req.params.id,
  }, (err, location) => {
    if (err) {
      res.status(httpStatus.OK).send('[]')
      return
    }

    res.status(httpStatus.OK).send(JSON.stringify(location))
  })
})

schema.static('findLocations', (req, res) => {
  if (req.params.keywords === '') {
    res.status(httpStatus.OK).send('[]')
    return
  }

  let data = req.params.keywords.split(',').map(e => {
    return new RegExp('.*?' + e.trim() + '.*?', 'i')
  })

  mongoose.model('Location').find({
    '$or' : [
      {keywords: {'$in': data}},
      {name: {'$in': data}},
    ],
  }, (err, locations) => {
    res.status(httpStatus.OK).send(JSON.stringify(locations))
  })
})

schema.static('addLocation', (req, res) => {
  const data = {
    name: req.body.name,
    lat: req.body.lat,
    lon: req.body.lon,
    weatherid: req.body.weatherid,
    countrycode: req.body.countrycode,
    currency: req.body.currency,
    keywords: req.body.keywords.split('\n'),
  }

  mongoose.model('Location').create(data, (err) => {
    if (err) {
      res.status(httpStatus.OK).send('not ok')
    } else {
      res.status(httpStatus.OK).send('ok')
    }
  })
})

schema.static('updateLocation', (req, res) => {
  const data = {
    name: req.body.name,
    lat: req.body.lat,
    lon: req.body.lon,
    weatherid: req.body.weatherid,
    countrycode: req.body.countrycode,
    currency: req.body.currency,
    keywords: req.body.keywords.split('\n'),
  }

  mongoose.model('Location').update({_id: req.body._id}, {
    '$set': data,
  }, (err, stats) => {
    if (stats.n === 1) {
      res.status(httpStatus.OK).send('ok')
    } else {
      res.status(httpStatus.OK).send('not ok')
    }
  })
})

schema.static('deleteLocation', (req, res) => {
  mongoose.model('Location').findOneAndRemove({name: req.params.name}, (err) => {
    if (err) {
      res.status(httpStatus.OK).send('not ok')
    } else {
      res.status(httpStatus.OK).send('ok')
    }
  })
})

module.exports = mongoose.model('Location', schema)
