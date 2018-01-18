import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteToken } from '../jwt'
import userAction from '../actions/user-action'
import store from '../store'

class HeaderMenu extends Component {
  constructor(props) {
    super(props)
  }

  removeUserData = () => {
    store.dispatch(userAction('REMOVE_USER'))
    deleteToken()
  }

  render = () =>
    <nav>
      <ul>
        {this.props.user ?
          <li><a onClick={() => this.removeUserData()} target='_blank'>logout</a></li> :
          <li><a href='/login' target='_blank'>login</a></li> }
        <li><a href='/admin/location' target='_blank'>manage locations</a></li>
      </ul>
    </nav>
}

const mapStateToProps = (store) => {
  return {
    user: store.userReducer.user,
  }
}

export default connect(mapStateToProps)(HeaderMenu)
