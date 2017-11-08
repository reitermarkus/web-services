const express = require('express')
const router = express.Router()
const user = require('./schema/user')

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

  res.status(500).send('passwords do not match')
})

router.post('/login', (req, res) => {
  user.login(req.body.email, req.body.password, (err, user) => {
    if(err || !user) {
      res.status(500).send('wrong email or password')
    } else {
      res.status(200).send('login successfull')
    }
  })
})

module.exports = router