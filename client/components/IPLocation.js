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
      address: {},
    }
  }

  componentDidMount() {
    fetch('https://geoip-db.com/json/')
      .then(res => res.json())
      .then(res => {
        this.setLocation({ lat: res.latitude, lon: res.longitude })
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') {
          console.error(err) // eslint-disable-line no-console
        }

        // Fail-over to another IP location API.
        fetch('http://ip-api.com/json/?fields=lat,lon')
          .then(res => res.json())
          .then(res => {
            this.setLocation({ lat: res.lat, lon: res.lon })
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
        }, true)
      }, err => {
        if (process.env.NODE_ENV === 'development') {
          console.error(err) // eslint-disable-line no-console
        }
      })
    }
  }

  setLocation({ lat, lon }, override = false) {
    lat = Number(lat)
    lon = Number(lon)

    this.setState(prevState => {
      if (prevState.initialized && !override) return {}

      store.dispatch(locationAction('USER_LOCATION', {
        lat: lat,
        lon: lon,
      }))

      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&zoom=10&lat=${lat}&lon=${lon}`)
        .then(res => res.json())
        .then(res => {
          delete res.lat
          delete res.lon

          this.setState(prevState => {
            if (prevState.initialized && !override) return {}

            store.dispatch(locationAction('USER_LOCATION', res))

            return res
          })
        })

      return { initialized: true, lat: lat, lon: lon }
    })
  }

  prettyLocationName() {
    return this.state.address.city
  }

  render = () => {
    if (this.state.initialized) {
      return (
        <fragment>
          <div className='iplocation'>
            <h2>IP location</h2>
            <h3>We track every step you&#39;re going ...</h3>
            You are here: {this.prettyLocationName()} ({this.state.lat}, {this.state.lon})
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
