import React from 'react'
import Logo from '../../arriven-logo.svg'
import HeaderMenu from './HeaderMenu'

const Header = () => (
  <header className='site-header'>
    <Logo className='logo'/>
    <HeaderMenu/>
  </header>
)

export default Header
