import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Places extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: this.props.query.replace(' ', '+'),
      data: {},
    }
  }

  componentWillUpdate() {
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.query}&language=en&key=${this.props.apiKey}`
    const opts = {}

    axios.post('/api/curl', {url: url, opts: opts})
      .then(res => {
        console.log('places:', res)
      })
  }

  render = () =>
    <fragment></fragment>
}

Places.propTypes = {
  query: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
}
