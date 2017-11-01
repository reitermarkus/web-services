import { Component } from 'react'
import PropTypes from 'prop-types'

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
    fetch('https://geoip-db.com/json')
      .then(res => res.json())
      .then(res => {
        if (!this.state.initialized) {
          this.setLocation({
            lat: res.latitude,
            lon: res.longitude,
          })
        }
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
    this.setState({
      initialized: true,
      lat: lat,
      lon: lon,
    })

    if (this.onLocationChange) {
      this.props.onLocationChange({lat: lat, lon: lon})
    }
  }

  render = () =>
    `You are here: (${this.state.lat}, ${this.state.lon})`
}

IPLocation.propTypes = {
  onLocationChange: PropTypes.func,
}

IPLocation.defaultProps = {
  ip: '', // An empty string means that the current IP is looked up.
}
