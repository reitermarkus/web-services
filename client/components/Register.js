import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthenticationSkeleton from './AuthenticationSkeleton'

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      user: '',
      redirect: false,
    }
  }

  render = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <AuthenticationSkeleton height={'29.5em'}>
        <form>
          <input type='text' value={this.state.user} onChange={(e) => { this.setState({user: e.target.value}) }} placeholder='username' />
          <input type='text' value={this.state.email} onChange={(e) => { this.setState({email: e.target.value}) }} placeholder='email' />
          <input type='password' value={this.state.password} onChange={(e) => { this.setState({password: e.target.value}) }} placeholder='password' />
          <input type='password' value={this.state.passwordConfirm} onChange={(e) => { this.setState({passwordConfirm: e.target.value}) }} placeholder='confirm password' />
          <button type='button'>register</button>
        </form>
      </AuthenticationSkeleton>
    )
  }
}
