import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from '../store'
import locationAction from '../actions/location-action'
import OpenStreetMap from './OpenStreetMap'

export default class IPLocation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialized: false,
      lat: 0,
      lon: 0,
    }
  }

  componentDidMount() {
    fetch('https://geoip-db.com/json/')
      .then(res => res.json())
      .then(res => {
        if (!this.state.initialized) {
          this.setLocation({
            lat: res.latitude,
            lon: res.longitude,
          })
        }
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') {
          console.error(err) // eslint-disable-line no-console
        }

        // Fail-over to another IP location API.
        fetch('http://ip-api.com/json/?fields=lat,lon')
          .then(res => res.json())
          .then(res => {
            if (!this.state.initialized) {
              this.setLocation(res)
            }
          })
          .catch(err => {
            if (process.env.NODE_ENV === 'development') {
              console.error(err) // eslint-disable-line no-console
            }
          })
      })

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        })
      }, err => {
        if (process.env.NODE_ENV === 'development') {
          console.error(err) // eslint-disable-line no-console
        }
      })
    }
  }

  setLocation({lat, lon}) {
    lat = Number(lat)
    lon = Number(lon)

    this.setState({
      initialized: true,
      lat: lat,
      lon: lon,
    })

    store.dispatch(locationAction('USER_LOCATION', {
      lat: lat,
      lon: lon,
    }))
  }

  render = () => {
    if (this.state.initialized) {
      return (
        <fragment>
          <div className='iplocation'>
            <h2>IP location</h2>
            <h3>We track every step you&#39;re going ...</h3>
            You are here: ({this.state.lat}, {this.state.lon})
          </div>
          <OpenStreetMap lat={this.state.lat} lon={this.state.lon}/>
        </fragment>
      )
    }

    return <fragment></fragment>
  }
}

IPLocation.propTypes = {
  ip: PropTypes.string,
}

IPLocation.defaultProps = {
  ip: '', // An empty string means that the current IP is looked up.
}
