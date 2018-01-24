import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteToken } from '../jwt'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import userAction from '../actions/user-action'
import store from '../store'

class HeaderMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirectLogin: false,
      redirectRegister: false,
    }
  }

  removeUserData = () => {
    store.dispatch(userAction('REMOVE_USER'))
    deleteToken()
  }

  render = () => {
    if (this.state.redirectLogin) {
      return <Redirect to='/login' />
    }

    if (this.state.redirectRegister) {
      return <Redirect to='/register' />
    }

    const renderUserMenu = () =>
      <li>
        <a className='has-submenu' href='#'>{this.props.user.username}</a>
        <ul className='sub-menu'>
          <li><a onClick={() => this.removeUserData()} target='_blank'>logout</a></li>
          {this.props.user.admin ?
            <li><a href='/admin/location' target='_blank'>manage locations</a></li> : null}
          <li><a href='/user/favourites' target='_blank'>manage favourites</a></li>
        </ul>
      </li>

    return (
      <nav className='col-xs-12 col-sm-6'>
        <ul className='menu'>
          {this.props.user ? null :
            <li><a onClick={() => this.setState({redirectRegister: true})} target='_blank'>register</a></li> }
          {this.props.user ? renderUserMenu() :
            <li><a onClick={() => this.setState({redirectLogin: true})} target='_blank'>login</a></li> }
        </ul>
      </nav>
    )
  }

}

const mapStateToProps = (store) => {
  return {
    user: store.userReducer.user,
  }
}

HeaderMenu.propTypes = {
  user: PropTypes.object,
  username: PropTypes.string,
  admin: PropTypes.bool,
}

export default connect(mapStateToProps)(HeaderMenu)
