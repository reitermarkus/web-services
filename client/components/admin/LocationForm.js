import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class LocationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'list',
      _id: '',
      name: '',
      lat: '',
      lon: '',
      weatherid: '',
      countrycode: '',
      currency: '',
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

  changeWeatherId = event => {
    this.setState({
      weatherid: event.target.value,
    })
  }

  changeKeywords = event => {
    this.setState({
      keywords: event.target.value,
    })
  }

  changeCountryCode = event => {
    this.setState({
      countrycode: event.target.value,
    })
  }

  changeCurrency = event => {
    this.setState({
      currency: event.target.value,
    })
  }

  addLocation = () => {
    axios.post('/api/location', this.state).catch(function(error) {
      console.error(error) // eslint-disable-line no-console
    })

    this.setState({
      mode: 'add',
      _id: '',
      name: '',
      lat: '',
      lon: '',
      weatherid: '',
      countrycode: '',
      currency: '',
      keywords: '',
    })
  }

  updateLocation = () => {
    axios.put('/api/location', this.state).catch(function(error) {
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
    this.props.setMode('list', this.props.emptyData)
  }

  componentWillReceiveProps(props) {
    this.setState({
      mode: props.mode,
      _id: props.data._id,
      name: props.data.name,
      lat: props.data.lat,
      lon: props.data.lon,
      weatherid: props.data.weatherid,
      countrycode: props.data.countrycode,
      currency: props.data.currency,
      keywords: props.data.keywords.join('\n'),
    })
  }

  render = () => {
    if (this.state.mode === 'add' || this.state.mode === 'update') {
      return (
        <form className='admin-location-form col' onSubmit={this.handleSubmit}>
          <input type='text' className='col-sm-6 col-md-2' name='name' value={this.state.name} placeholder='name' onChange={this.changeName}/>
          <input type='text' className='col-sm-6 col-md-2' name='lat' value={this.state.lat} placeholder='latitude' onChange={this.changeLatitude}/>
          <input type='text' className='col-sm-6 col-md-2' name='lon' value={this.state.lon} placeholder='longitude' onChange={this.changeLongitude}/>
          <input type='text' className='col-sm-6 col-md-2' name='weatherid' value={this.state.weatherid} placeholder='weather id' onChange={this.changeWeatherId}/>
          <input type='text' className='col-sm-6 col-md-2' name='countrycode' value={this.state.countrycode} placeholder='country code' onChange={this.changeCountryCode}/>
          <input type='text' className='col-sm-6 col-md-2' name='currency' value={this.state.currency} placeholder='currency' onChange={this.changeCurrency}/>
          <textarea rows='10' className='col-sm-12' name='keywords' value={this.state.keywords} placeholder='keywords (newline separated)' onChange={this.changeKeywords}></textarea>
          <input type='submit' className='col-sm-6 col-md-3' value={this.state.mode + ' location'}/>
          <input type='button' className='col-sm-6 col-md-2' value='cancel' onClick={this.showList}/>
        </form>
      )
    }

    return (<fragment></fragment>)
  }
}

LocationForm.propTypes = {
  mode: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  emptyData: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
}
