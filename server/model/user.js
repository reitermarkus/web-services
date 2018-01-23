const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const httpStatus = require('http-status-codes')

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

userSchema.static('userLogin', (req, res) => {
  user.login(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('wrong email or password')
    } else {
      res.status(httpStatus.OK).end()
    }
  })
})

userSchema.static('userInfo', (req, res) => {
  user.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('error while getting user')
    } else if (user) {
      res.status(httpStatus.OK).send(JSON.stringify({
        'email': user.email,
        'username': user.username,
        'admin': user.admin,
        'favourites': user.favourites,
      }))
    }
  })
})

userSchema.static('userFavourites', (req, res) => {
  mongoose.model('User').update({email: req.body.email}, {
    '$set': {'favourites': req.body.favourites},
  }, (err) => {
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('could not update favourites')
    } else {
      res.status(httpStatus.OK).end()
    }
  })
})

userSchema.static('userCreate', (req, res) => {
  if (req.body.password === req.body.passwordConf) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
      admin: false,
    }

    user.create(userData, (err) => {
      if (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
      } else {
        res.status(httpStatus.CREATED).send('user created successfully')
      }
    })
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('passwords do not match')
  }
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
