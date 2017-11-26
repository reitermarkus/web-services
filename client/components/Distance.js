import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { computeDistanceBetween, LatLng } from 'spherical-geometry-js'
import numeral from 'numeral'

class Distance extends Component {
  constructor(props) {
    super(props)

    this.state = {
      from: this.props.from.replace(' ', '+'),
      to: this.props.to.replace(' ', '+'),
      result: {
        from: '',
        to: '',
        distance: '',
        time: '',
        transport: 'car',
      },
    }
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

  componentWillReceiveProps(newProps) {
    this.fetch(newProps)
  }

  componentDidMount() {
    this.fetch(this.props)
  }

  fetch(props) {
    if (!props.coordFrom.lat || !props.coordFrom.lon) return
    if (!props.coordTo.lat || !props.coordTo.lon) return

    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(props.from)}&destinations=${encodeURIComponent(props.to)}&language=en&key=${props.apiKey}`
    const opts = {}

    axios.post('/api/curl', {url: url, opts: opts})
      .then(res => {
        if (this.parseGoogleData(res.data)) {
          return
        }

        // Calculate distance and estimate travel time by an average speed
        let dist = computeDistanceBetween(new LatLng(props.coordFrom.lat, props.coordFrom.lon), new LatLng(props.coordTo.lat, props.coordTo.lon)) / 1000 // Km
        let time = (dist / 300 + 2) * 3600 // Sec
        let hours = Math.floor(time / 3600)
        let mins = Math.floor((time - hours * 3600) / 60)

        this.setState({
          result: {
            from: res.data.origin_addresses.first,
            to: res.data.destination_addresses.first,
            distance: numeral(dist).format('0,0.0') + ' km',
            time: (((hours) ? hours + ' hours' : '') + ' ' + ((mins) ? mins + ' mins' : '')).trim(),
            transport: 'plane',
          },
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

const mapStateToProps = (store) => {
  return {
    coordFrom: store.locationReducer,
  }
}

export default connect(mapStateToProps)(Distance)

Distance.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  coordFrom: PropTypes.objectOf(PropTypes.number).isRequired,
  coordTo: PropTypes.objectOf(PropTypes.number).isRequired,
}
