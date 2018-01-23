const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const SALT_WORK_FACTOR = 10
const required = 'is required'

const emailValidators = [
  {
    validator: (v, cb) => {
      user.find({email: v}, (err, user) => cb(user.length === 0))
    }, message: 'email already in use',
  },
  {
    validator: validator.isEmail, message: 'email is invalid',
  },
]

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, `email ${required}`],
    trim: true,
    validate: emailValidators,
  },
  username: {
    type: String,
    required: [true, `username ${required}`],
    trim: true,
    validate: {
      isAsync: true,
      validator: (v, cb) => {
        user.find({username: v}, (err, user) => cb(user.length === 0))
      }, message: 'username already in use',
    },
  },
  password: {
    type: String,
    required: [true, `password ${required}`],
  },
  admin: {
    type: Boolean,
  },
  favourites: {
    type: Array,
  },
})

userSchema.statics.login = (email, password, callback) => {
  user.findOne({ email: email }, (err, user) => {
    if (err) {
      return callback(err)
    } else if (!user) {
      return callback(new Error('User not found.'))
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        return callback(null, user)
      }

      return callback()
    })
  })
}

userSchema.pre('save', function(next) {
  const user = this

  bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash) {
    if (err) {
      return next(err)
    }

    user.password = hash
    next()
  })
})

const user = mongoose.model('User', userSchema)

module.exports = user
