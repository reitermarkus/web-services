import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Distance extends Component {
  constructor(props) {
    super(props)

    this.state = {
      from: this.props.from.replace(' ', '+'),
      to: this.props.to.replace(' ', '+'),
      lat1: 0,
      lon1: 0,
      lat2: 0,
      lon2: 0,
      result: {
        from: '',
        to: '',
        distance: '',
        time: '',
        transport: 'car',
      },
    }
  }

  distanceBetweenCoordinates() {
    // Copied from https://www.movable-type.co.uk/scripts/latlong.html
    let rad = 6371e3 // Meters
    let phi1 = this.state.lat1.toRadians()
    let phi2 = this.state.lat2.toRadians()
    let deltaPhi = (this.state.lat2 - this.state.lat1).toRadians()
    let deltaGamma = (this.state.lon2 - this.state.lon1).toRadians()

    let a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaGamma / 2) * Math.sin(deltaGamma / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return (rad * c) / 1000 // Kilometers
  }

  parseGoogleData(data) {
    if (data.rows.first.elements.first.status !== 'OK') {
      return false
    }

    this.setState({
      result: {
        from: data.origin_addresses.first,
        to: data.destination_addresses.first,
        distance: data.rows.first.elements.first.distance.text,
        time: data.rows.first.elements.first.duration.text,
        transport: 'car',
      },
    })

    return true
  }

  componentDidMount() {
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.state.from}&destinations=${this.state.to}&language=en&key=${this.props.apiKey}`
    const opts = {}

    axios.post('/api/curl', {url: url, opts: opts})
      .then(res => {
        if (this.parseGoogleData(res.data)) {
          return
        }

        // Calculate distance and estimate travel time by an average speed
        // Do: let time = distanceBetweenCoordinates() / averageSpeed
        this.setState({
          result: {
            from: res.data.origin_addresses.first,
            to: res.data.destination_addresses.first,
            distance: '-',
            time: '-',
            transport: 'plane',
          }
        })
      })
  }

  render = () =>
    <div className='distance'>
      <h2>Distance</h2>
      <h3>How long will it take to reach the goal?</h3>
      <div>
        <div>
          <label>from</label>
          <span>{this.state.result.from}</span>
        </div>
        <div>
          <label>to</label>
          <span>{this.state.result.to}</span>
        </div>
        <div>
          <label>distance</label>
          <span>{this.state.result.distance}</span>
        </div>
        <div>
          <label>time</label>
          <span>{this.state.result.time}</span>
        </div>
        <div>
          <label>required mean(s) of transportation</label>
          <span>{this.state.result.transport}</span>
        </div>
      </div>
    </div>
}

Distance.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
}
