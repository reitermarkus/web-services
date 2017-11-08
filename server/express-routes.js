const express = require('express')
const router = express.Router()
const user = require('./schema/user')
const httpStatus = require('http-status-codes')

router.post('/user', (req, res, next) => {
  if (req.body.password === req.body.passwordConf) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    user.create(userData, (err) => {
      if (err) {
        return next(err)
      }
    })
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send('passwords do not match')
})

router.post('/login', (req, res) => {
  user.login(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('wrong email or password')
    } else {
      res.status(httpStatus.OK).send('login successfull')
    }
  })
})

module.exports = router