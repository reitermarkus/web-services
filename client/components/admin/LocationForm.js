import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class LocationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'add',
      id: '',
      name: '',
      lat: '',
      lon: '',
      imgs: '',
      keywords: '',
    }
  }

  changeName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  changeLatitude = event => {
    this.setState({
      lat: event.target.value,
    })
  }

  changeLongitude = event => {
    this.setState({
      lon: event.target.value,
    })
  }

  changeImages = event => {
    this.setState({
      imgs: event.target.value,
    })
  }

  changeKeywords = event => {
    this.setState({
      keywords: event.target.value,
    })
  }

  addLocation = () => {
    axios.post('/api/location/add', this.state).catch(function(error) {
      console.error(error) // eslint-disable-line no-console
    })

    this.setState({
      mode: 'add',
      id: '',
      name: '',
      lat: '',
      lon: '',
      imgs: '',
      keywords: '',
    })
  }

  updateLocation = () => {
    axios.post('/api/location/update', this.state).catch(function(error) {
      console.error(error) // eslint-disable-line no-console
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    if (this.state.mode === 'add') {
      this.addLocation(event)
    } else {
      this.updateLocation(event)
    }
  }

  showList = () => {
    this.props.setMode.call(this.props.view, 'list')
  }

  render = () =>
    <form className='admin-location-form col' onSubmit={this.handleSubmit}>
      <input type='text' className='col-sm-4' name='name' value={this.state.name} placeholder='name' onChange={this.changeName}/>
      <input type='text' className='col-sm-4' name='lat' value={this.state.lat} placeholder='latitude' onChange={this.changeLatitude}/>
      <input type='text' className='col-sm-4' name='lon' value={this.state.lon} placeholder='longitude' onChange={this.changeLongitude}/>
      <textarea type='text' rows='10' className='col-sm-12' name='imgs' value={this.state.imgs} placeholder='images (newline separated)' onChange={this.changeImages}></textarea>
      <textarea type='text' rows='10' className='col-sm-12' name='keywords' value={this.state.keywords} placeholder='keywords (newline separated)' onChange={this.changeKeywords}></textarea>
      <input type='submit' value={this.state.mode + ' location'}/>
      <input type='button' value='cancel' onClick={this.showList}/>
    </form>
}

LocationForm.propTypes = {
  setMode: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired,
}
