const mongoose = require('mongoose')

const pixabaySchema = new mongoose.Schema({
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
})

const pixabay = mongoose.model('Pixabay', pixabaySchema)

module.exports = pixabay
