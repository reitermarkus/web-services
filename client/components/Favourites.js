import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import { getUserInfo } from '../jwt'

class Favourites extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timeout: null,
      input: '',
    }
  }

  handleChange = event => {
    this.setState({
      input: event.target.value,
    })

    this.clearTimeout()

    this.setState({
      timeout: setTimeout(() => {
        this.addFavourite()
      }, 1000),
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.clearTimeout()
    this.performSearch()
  }

  clearTimeout = () => {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
      this.setState({
        timeout: null,
      })
    }
  }

  addFavourite = () => {
    if (this.state.input !== '') {
      this.updateFavourites([this.state.input, ...this.props.user.favourites])
    }
  }

  updateFavourites = (favourites) => {
    axios.post('/user/favourites', {
      email: this.props.user.email,
      favourites: favourites,
    }).then(() => {
      getUserInfo()
    })
  }

  render = () =>
    <div className='fav-wrapper'>
      <input type='text' placeholder='Enter new favourite' onChange={this.handleChange} defaultValue={this.state.input}/>
      {this.props.user && this.props.user.favourites ?
        <ul>
          {this.props.user.favourites.map((fav, key) =>
            <li key={key}>
              <span />
              <div>{fav}</div>
              <span onClick={() => this.updateFavourites(this.props.user.favourites.filter(i => i !== fav))}>✕</span>
            </li>)}
        </ul> : null}
    </div>
}

const mapStateToProps = (store) => {
  return {
    user: store.userReducer.user,
  }
}

Favourites.propTypes = {
  user: PropTypes.object,
}

export default connect(mapStateToProps)(Favourites)