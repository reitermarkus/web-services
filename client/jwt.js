const jwt = require('jsonwebtoken')
const secret = 'arriven'

export const signAuth = (email) => {
  if (!hasToken()) {
    jwt.sign({ email: email },
      secret, (err, token) => localStorage.setItem('auth', token))
  }
}

export const hasToken = () => localStorage.getItem('auth') !== null

export const getToken = () => {
  const token = localStorage.getItem('auth')

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw Error('Error during decode process')
      }

      return decoded
    })
  }
}
