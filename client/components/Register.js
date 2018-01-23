import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import store from '../store'
import AuthenticationSkeleton from './AuthenticationSkeleton'
import notificationAction from '../actions/notification-action'
import { signAuth, hasToken, setUserInfo } from '../jwt'

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConf: '',
      username: '',
      redirect: false,
      messages: null,
    }
  }

  componentDidMount() {
    if (hasToken()) {
      this.setState({redirect: true})
    }
  }

  register = () => {
    event.preventDefault()

    axios.post('/user', {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      passwordConf: this.state.passwordConf,
    }).then(() => {
      signAuth(this.state.email)

      setUserInfo(this.state.email, () => {
        this.setState({redirect: true})
      })
    }).catch((err) => {
      const res = err.response.data.split(':')

      if (res.length > 1) {
        store.dispatch(notificationAction('ERROR',
          res.slice(2, res.length).map((msg) =>  msg.includes(',') ? msg.split(',')[0] : msg)))
      } else {
        store.dispatch(notificationAction('ERROR', res))
      }
    })
  }

  render = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <fragment>
        <AuthenticationSkeleton height={'31em'} title={'Register'}>
          <form>
            <input type='text' value={this.state.username} onChange={(e) => { this.setState({username: e.target.value}) }} placeholder='username' />
            <input type='text' value={this.state.email} onChange={(e) => { this.setState({email: e.target.value}) }} placeholder='email' />
            <input type='password' value={this.state.password} onChange={(e) => { this.setState({password: e.target.value}) }} placeholder='password' />
            <input type='password' value={this.state.passwordConf} onChange={(e) => { this.setState({passwordConf: e.target.value}) }} placeholder='confirm password' />
            <button type='button' onClick={this.register}>register</button>
          </form>
        </AuthenticationSkeleton>
      </fragment>
    )
  }
}
