import React from 'react'
import Logo from '../../arriven-logo.svg'
import PropTypes from 'prop-types'

const AuthenticationSkeleton = (props) =>
  <div className='login-form' style={{height: props.height}}>
    <div className='top'>
      <Logo className='logo'/>
    </div>
    <div className='wrapper'>
      {props.children}
    </div>
  </div>

AuthenticationSkeleton.propTypes = {
  children: PropTypes.object,
  height: PropTypes.string.isRequired,
}

export default AuthenticationSkeleton
