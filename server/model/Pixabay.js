const httpStatus = require('http-status-codes')
const axios = require('axios')
const PixabayModel = require('../schema/Pixabay')

class Pixabay {
  static find(req, res) {
    const query = req.params.query

    // Try fetching from database first.
    PixabayModel.findOne({query: query}, (err, result) => {
      // Pixabay invalidates image-links after some time.
      // At the moment we assume it is about 24 hours. So we store the time, when we cached the entry.
      // If the time exceeds the given delta, we refetch data from Pixabay.
      const dayInMS = 86400000

      if (result === null || err || (Date.now() - result.time || 0) > dayInMS) {
        axios.get(`https://pixabay.com/api/?q=${query}&image_type=photo&category=buildings&key=${process.env.PIXABAY_API_KEY}`)
          .then(({ data }) => {
            data.query = query
            data.time = Date.now()

            PixabayModel.create(data, (err) => {
              if (err) {
                console.error(err) // eslint-disable-line no-console
              }
            })

            res.status(httpStatus.OK).send(JSON.stringify(data))
          })
      } else {
        res.status(httpStatus.OK).send(JSON.stringify(result))
      }
    })
  }
}

module.exports = Pixabay
