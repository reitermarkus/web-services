import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import store from '../store'
import AuthenticationSkeleton from './AuthenticationSkeleton'
import notificationAction from '../actions/notification-action'
import { signAuth, hasToken, setUserInfo } from '../jwt'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      redirect: false,
      messages: null,
    }
  }

  componentDidMount() {
    if (hasToken()) {
      this.setState({redirect: true})
    }
  }

  login = (event) => {
    event.preventDefault()

    axios.post('/login', {
      email: this.state.email,
      password: this.state.password,
    }).then(() => {
      signAuth(this.state.email)

      setUserInfo(this.state.email, () => {
        this.setState({redirect: true})
      })
    }).catch((err) => {
      store.dispatch(notificationAction('ERROR', [err.response.data]))
    })
  }

  render = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <fragment>
        <AuthenticationSkeleton height={'23.5em'} title={'login'}>
          <form>
            <input type='text' value={this.state.email} onChange={(e) => { this.setState({email: e.target.value}) }} placeholder='email' />
            <input type='password' value={this.state.password} onChange={(e) => { this.setState({password: e.target.value}) }} placeholder='password' />
            <button type='submit' onClick={this.login}>login</button>
          </form>
        </AuthenticationSkeleton>
      </fragment>
    )
  }
}
