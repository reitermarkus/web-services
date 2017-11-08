const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  keywords: {
    type: Array,
    unique: false,
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
  imgs: {
    type: Array,
    unique: false,
    required: false,
    trim: true,
  },
})

/* TODO
locationSchema.pre('save', function(next) {
  const location = this

  console.log('saving: ', this)
  next()
})
*/

const location = mongoose.model('Location', locationSchema)

module.exports = location
