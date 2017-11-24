const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
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
  keywords: {
    type: Array,
    unique: false,
    required: true,
    trim: true,
  },
})

const location = mongoose.model('Location', locationSchema)

module.exports = location
