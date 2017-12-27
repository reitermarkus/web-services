const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v, cb) => {
        user.find({email: v}, (err, user) => cb(user.length === 0))
      }, message: 'already in use',
    },
  },
  username: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v, cb) => {
        user.find({username: v}, (err, user) => cb(user.length === 0))
      }, message: 'already in use',
    },
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.login = (email, password, callback) => {
  user.findOne({ email: email }).exec((err, user) => {
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
