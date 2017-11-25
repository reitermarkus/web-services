const mongoose = require('mongoose')

const fixerSchema = new mongoose.Schema({
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

const fixer = mongoose.model('Fixer', fixerSchema)

module.exports = fixer
