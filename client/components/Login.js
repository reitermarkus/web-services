import React, { Component } from 'react'
import Logo from '../../arriven-logo.svg'

export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  render = () =>
    <div className='login-form'>
      <div className='top'>
        <Logo className='logo'/>
      </div>
      <div className='wrapper'>
        <form>
          <input type='text' placeholder='email' />
          <input type='password' placeholder='password' />
          <button>login</button>
        </form>
      </div>

    </div>
}
