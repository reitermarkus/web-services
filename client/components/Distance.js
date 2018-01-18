import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { computeDistanceBetween, LatLng } from 'spherical-geometry-js'
import numeral from 'numeral'

import Icon from 'react-icons-kit'
import { car } from 'react-icons-kit/fa/car'
import { plane } from 'react-icons-kit/fa/plane'

class Distance extends Component {
  constructor(props) {
    super(props)

    this.state = {
      to: this.props.to.replace(' ', '+'),
      result: {
        from: '',
        to: '',
        distance: '',
        time: '',
        transport: 'car',
        icon: car,
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
        icon: car,
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
            icon: plane,
          },
        })
      })
  }

  render = () =>
    <fragment>
      <div className='distance'>
        <h2>Distance</h2>
        <p>{this.state.result.distance}<br/> from {this.state.result.from}</p>
        <h2>Travel Time</h2>
        <p>{this.state.result.time} <br/>by {this.state.result.transport} <Icon icon={this.state.result.icon}/></p>
      </div>
    </fragment>
}

const mapStateToProps = (store) => {
  return {
    from: ((store.locationReducer.city || '') + ' ' + (store.locationReducer.country || '')).replace(' ', '+'),
    coordFrom: {lat: store.locationReducer.lat, lon: store.locationReducer.lon},
  }
}

export default connect(mapStateToProps)(Distance)

Distance.propTypes = {
  to: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  coordFrom: PropTypes.object.isRequired,
  coordTo: PropTypes.object.isRequired,
}
