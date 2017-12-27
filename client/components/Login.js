import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Logo from '../../arriven-logo.svg'
import axios from 'axios'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      redirect: false,
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
      alert(err.response.data)
    })
  }

  render = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <div className='login-form'>
        <div className='top'>
          <Logo className='logo'/>
        </div>
        <div className='wrapper'>
          <form>
            <input type='text' value={this.state.email} onChange={(e) => { this.setState({email: e.target.value}) }} placeholder='email' />
            <input type='password' value={this.state.password} onChange={(e) => { this.setState({password: e.target.value}) }} placeholder='password' />
            <button type='button' onClick={this.login}>login</button>
          </form>
        </div>
      </div>
    )
  }
}
