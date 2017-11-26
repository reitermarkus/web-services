const mongoose = require('mongoose')
const Schema = mongoose.Schema

const httpStatus = require('http-status-codes')
const axios = require('axios')

let schema = new Schema({
  query: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  totalHits: {
    type: Number,
    unique: false,
    required: true,
    trim: true,
  },
  hits: {
    type: Array,
    unique: false,
    required: true,
    trim: true,
  },
  total: {
    type: Number,
    unique: false,
    required: true,
    trim: true,
  },
  time: {
    type: Number,
    unique: false,
    required: false,
    trim: true,
  },
})

schema.static('findImages', (req, res) => {
  const query = req.params.query

  // Try fetching from database first.
  mongoose.model('Pixabay').findOne({query: query}, (err, result) => {
    // Pixabay invalidates image-links after some time.
    // At the moment we assume it is about 24 hours. So we store the time, when we cached the entry.
    // If the time exceeds the given delta, we refetch data from Pixabay.
    const dayInMS = 86400000

    if (result === null || err || (Date.now() - result.time || 0) > dayInMS) {
      axios.get(`https://pixabay.com/api/?q=${query}&image_type=photo&category=buildings&key=${process.env.PIXABAY_API_KEY}`)
        .then(({ data }) => {
          data.query = query
          data.time = Date.now()

          mongoose.model('Pixabay').update({ query: query }, data, {upsert: true}, (err) => {
            if (err) {
              console.error(err) // eslint-disable-line no-console
            }
          })

          res.status(httpStatus.OK)
          res.json(data)
        })
    } else {
      res.status(httpStatus.OK)
      res.json(result)
    }
  })
})

module.exports = mongoose.model('Pixabay', schema)
