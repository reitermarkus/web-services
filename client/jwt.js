import axios from 'axios'
import store from './store'
import userAction from './actions/user-action'
import jwt from 'jsonwebtoken'

const secret = 'arriven'

export const signAuth = (email) => {
  if (!hasToken()) {
    jwt.sign({ email: email },
      secret, (err, token) => localStorage.setItem('auth', token))
  }
}

export const getToken = () => localStorage.getItem('auth')
export const hasToken = () => getToken() !== null
export const decryptToken = (token) => token ? jwt.verify(token, secret).email : null

export const getUserInfo = () => {
  const email = decryptToken(getToken())

  if (email) {
    axios.post('/user/info', {
      email: email,
    }).then((res) => {
      store.dispatch(userAction('GET_USER', {
        'email' : res.data.email,
        'username': res.data.username,
        'admin': res.data.admin,
      }))
    })
  }
}
