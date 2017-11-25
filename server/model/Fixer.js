const httpStatus = require('http-status-codes')
const axios = require('axios')
const fix = require('../schema/fixer')

class Fixer {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.base = req.query.base
    this.today = (new Date()).toISOString().split('T')[0]
  }

  cache(data) {
    data.date = this.today

    fix.create(data, (err) => {
      if (err) {
        console.error(err) // eslint-disable-line no-console
      }
    })
  }

  fetchFromApi(cb) {
    axios.get(`https://api.fixer.io/latest?base=${this.base}`)
      .then(res => {
        cb(res.data)
      })
  }

  fetchFromCache(cb) {
    fix.findOne({
      '$and' : [
        {base: this.base},
        {date: this.today},
      ],
    }, cb)
  }

  request() {
    this.fetchFromCache((err, result) => {
      if (result === null || err) {
        this.fetchFromApi(res => {
          this.cache(res)
          this.res.status(httpStatus.OK).send(JSON.stringify(res.rates))
        })
      } else {
        this.res.status(httpStatus.OK).send(JSON.stringify(result.rates))
      }
    })
  }
}

module.exports = Fixer
