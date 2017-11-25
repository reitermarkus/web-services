const mongoose = require('mongoose')
const Schema = mongoose.Schema

const httpStatus = require('http-status-codes')
const axios = require('axios')

const schema = new Schema({
  base: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  rates: {
    type: Object,
    unique: false,
    required: true,
    trim: true,
  },
})

schema.static('ratesForBase', (req, res) => {
  const base = req.params.base
  const today = (new Date()).toISOString().split('T')[0]

  mongoose.model('Fixer').findOne({
    '$and' : [
      {base: base},
      {date: today},
    ],
  }, (err, result) => {
    if (result === null || err) {
      axios.get(`https://api.fixer.io/latest?base=${base}`)
        .then(({ data }) => {
          data.date = today

          mongoose.model('Fixer').create(data, (err) => {
            if (err) {
              console.error(err) // eslint-disable-line no-console
            }
          })

          res.status(httpStatus.OK)
          res.json(data.rates)
        })
    } else {
      res.status(httpStatus.OK)
      res.json(result.rates)
    }
  })
})

module.exports = mongoose.model('Fixer', schema)
