import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import { getUserInfo } from '../jwt'

class Favourites extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
    }
  }

  handleChange = event => {
    this.setState({
      input: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.performSearch()
  }

  addFavourite = (event) => {
    event.preventDefault()

    if (this.state.input !== '' && !this.props.user.favourites.includes(this.state.input)) {
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
    <fragment>
      <h1>Edit favourites</h1>
      <p>Enter some keywords to describe what interests you have.</p>
      <div className='fav-wrapper col'>
        <form className='col col-xs-12'>
          <input type='text' className='col-xs-10 col-sm-11' placeholder='Enter new favourite' onChange={this.handleChange} defaultValue={this.state.input}/>
          <button type='submit' className='col-xs-2 col-sm-1' onClick={this.addFavourite}>+</button>
        </form>
        {this.props.user && this.props.user.favourites ?
          <ul className='col col-xs-12'>
            {this.props.user.favourites.map((fav, key) =>
              <li key={key} className='col-xs-12 col-sm-4'>
                <span />
                <div>{fav}</div>
                <span className='close' onClick={() => this.updateFavourites(this.props.user.favourites.filter(i => i !== fav))}>✕</span>
              </li>)}
          </ul> : null}
      </div>
    </fragment>
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
