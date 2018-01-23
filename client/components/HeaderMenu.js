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
      redirect: false,
    }
  }

  removeUserData = () => {
    store.dispatch(userAction('REMOVE_USER'))
    deleteToken()
  }

  render = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }

    const renderUserMenu = () =>
      <li>
        <a href='#'>{this.props.user.username}</a>
        <ul>
          <li><a onClick={() => this.removeUserData()} target='_blank'>logout</a></li>
          {this.props.user.admin ?
            <li><a href='/admin/location' target='_blank'>manage locations</a></li> : null}
          <li><a href='/user/favourites' target='_blank'>manage favourites</a></li>
        </ul>
      </li>

    return (
      <nav>
        <ul>
          {this.props.user ? renderUserMenu() :
            <li><a onClick={() => this.setState({redirect: true})} target='_blank'>login</a></li> }

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
