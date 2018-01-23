import React from 'react'
import Logo from '../../arriven-logo.svg'
import HeaderMenu from './HeaderMenu'

const Header = () =>
  <header className='site-header col no-gap'>
    <a href='/' className='logo col-xs-12 col-sm-6'><Logo/></a>
    <HeaderMenu/>
  </header>

export default Header
