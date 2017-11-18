import React from 'react'
import Logo from '../../arriven-logo.svg'
import HeaderMenu from './HeaderMenu'

const Header = () =>
  <header>
    <a href='/' className='logo'><Logo/></a>
    <HeaderMenu/>
  </header>

export default Header
