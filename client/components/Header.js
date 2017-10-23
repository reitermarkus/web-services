import React, { Component } from 'react'
import Logo from '../../arriven-logo.svg'

export default class Header extends Component {
  render() {
    return (
      <header>
        <Logo height='2em'/>
        <nav id='menu'>
          <ul>
            <li>...</li>
            <li>...</li>
            <li>...</li>
          </ul>
        </nav>
      </header>
    )
  }
}
