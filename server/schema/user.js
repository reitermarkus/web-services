const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', (next) => {
  const user = this

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }

    user.password = hash
    next()
  })
})

const user = mongoose.model('User', userSchema)

module.exports = user