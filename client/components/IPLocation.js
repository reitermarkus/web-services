import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ipLocator from 'ip-locator'

export default class IPLocation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: null,
      country: null,
      countryCode: null,
      region: null,
      regionName: null,
      city: null,
      zip: null,
      lat: null,
      lon: null,
      timezone: null,
      isp: null,
      org: null,
      as: null,
      query: null,
    }
  }

  componentWillMount() {
    ipLocator.getDomainOrIPDetails(this.props.ip, 'json', (err, data) => {
      if (err && process.env.NODE_ENV === 'development') {
        console.error(err) // eslint-disable-line no-console
      }

      if (data) {
        this.setState(data)
      }
    })
  }

  render = () =>
    `You are here: ${this.state.city} (${this.state.country}) [${this.state.lat}, ${this.state.lon}]`
}

IPLocation.propTypes = {
  ip: PropTypes.string,
}

IPLocation.defaultProps = {
  ip: '', // An empty string means that the current IP is looked up.
}
