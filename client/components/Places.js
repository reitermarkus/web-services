import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Places extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: this.props.query.replace(' ', '+'),
      data: {},
    }
  }

  componentWillUpdate() {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.query}&language=en&key=${this.props.apiKey}`, {credentials: 'same-origin'})
      .then(res => console.log('places:', res))
      .then(res => {
        console.log(res)
      })
  }

  render = () =>
    <fragment>
      test
    </fragment>
}

Places.propTypes = {
  query: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
}
