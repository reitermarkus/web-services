const httpStatus = require('http-status-codes')
const axios = require('axios')
const pix = require('../schema/pixabay')

class Pixabay {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.query = req.body.query
    this.data = []
  }

  cache(data) {
    pix.create(data, (err) => {
      if (err) {
        console.error(err) // eslint-disable-line no-console
      }
    })
  }

  static clear(res) {
    pix.remove({}, (err) => {
      if (err) {
        res.status(httpStatus.OK).send('not ok')
      } else {
        res.status(httpStatus.OK).send('ok')
      }
    })
  }

  fetchFromApi(cb) {
    axios.get(`https://pixabay.com/api/?q=${this.query}&image_type=photo&category=buildings&key=${process.env.PIXABAY_API_KEY}`)
      .then(res => {
        cb(res.data)
      })
  }

  fetchFromCache(cb) {
    pix.findOne({query: this.query}, cb)
  }

  find() {
    this.fetchFromCache((err, result) => {
      // Pixabay invalidates image-links after some time.
      // At the moment we assume it is about 24 hours. So we store the time, when we cached the entry.
      // If the time exceeds the given delta, we refetch data from Pixabay.
      const dayInMS = 86400000

      if (result === null || err || (Date.now() - result.time || 0) > dayInMS) {
        this.fetchFromApi(res => {
          let data = res

          data.query = this.query
          data.time = Date.now()
          this.data = data

          this.cache(data)

          this.res.status(httpStatus.OK).send(JSON.stringify(data))
        })
      } else {
        this.res.status(httpStatus.OK).send(JSON.stringify(result))
      }
    })
  }
}

module.exports = Pixabay
