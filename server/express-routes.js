const express = require('express')
const router = express.Router()
const user = require('./schema/user')

router.post('/user', (req, res, next) => {
  const userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }

  user.create(userData, (error, user) => {
    if (error) {
      return next(error)
    }

    console.log(`created user ${user}`)
  })
})

module.exports = router