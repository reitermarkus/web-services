import React, { Component } from 'react'
import axios from 'axios'
import '../../style/admin.scss'

export default class LocationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

  addLocation = event => {
    event.preventDefault()

    axios.post('/api/location/add', this.state).catch(function(error) {
      console.error(error) // eslint-disable-line no-console
    })

    this.setState({
      name: '',
      lat: '',
      lon: '',
      imgs: '',
      keywords: '',
    })
  }

  render = () =>
    <form className='admin-location-form col' onSubmit={this.addLocation}>
      <input type='text' className='col-sm-4' name='name' value={this.state.name} placeholder='name' onChange={this.changeName}/>
      <input type='text' className='col-sm-4' name='lat' value={this.state.lat} placeholder='latitude' onChange={this.changeLatitude}/>
      <input type='text' className='col-sm-4' name='lon' value={this.state.lon} placeholder='longitude' onChange={this.changeLongitude}/>
      <textarea type='text' rows='10' className='col-sm-12' name='imgs' value={this.state.imgs} placeholder='images (newline separated)' onChange={this.changeImages}></textarea>
      <textarea type='text' rows='10' className='col-sm-12' name='keywords' value={this.state.keywords} placeholder='keywords (newline separated)' onChange={this.changeKeywords}></textarea>
      <input type='submit' value='add location'/>
    </form>
}
