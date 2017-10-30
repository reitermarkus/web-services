import { Component } from 'react'
import PropTypes from 'prop-types'

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

  componentDidMount() {
    fetch(`http://ip-api.com/json/${this.props.ip}`)
      .then(res => res.json())
      .then(res => this.setState(res))
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
