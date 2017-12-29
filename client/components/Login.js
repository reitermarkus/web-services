import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import AuthenticationSkeleton from './AuthenticationSkeleton'
import Notification from './Notification'

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

  login = () => {
    event.preventDefault()

    axios.post('/login', {
      email: this.state.email,
      password: this.state.password,
    }).then(() => {
      this.setState({redirect: true})
    }).catch((err) => {
      this.setState({messages: [err.response.data]})
    })
  }

  render = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <fragment>
        <Notification messages={this.state.messages} type={'error'} />
        <AuthenticationSkeleton height={'23.5em'} title={'login'}>
          <form>
            <input type='text' value={this.state.email} onChange={(e) => { this.setState({email: e.target.value}) }} placeholder='email' />
            <input type='password' value={this.state.password} onChange={(e) => { this.setState({password: e.target.value}) }} placeholder='password' />
            <button type='button' onClick={this.login}>login</button>
          </form>
        </AuthenticationSkeleton>
      </fragment>
    )
  }
}
