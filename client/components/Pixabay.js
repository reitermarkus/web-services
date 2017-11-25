import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Slider from './Slider'

export default class Pixabay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        hits: [],
      },
    }
  }

  updateState(data) {
    this.setState({
      data: {
        totalHits: data.totalHits,
        hits: data.hits,
        total: data.total,
      },
    })
  }

  componentWillReceiveProps(newProps) {
    this.fetch(newProps)
  }

  componentDidMount() {
    this.fetch(this.props)
  }

  fetch(props) {
    axios.get(`/api/pixabay/find/${encodeURIComponent(props.query)}`)
      .then(res => res.data)
      .then(res => {
        this.updateState(res)
      })
      .catch(function(error) {
        console.error(error) // eslint-disable-line no-console
      })
  }

  render = () =>
    <fragment>
      <Slider images={this.state.data.hits.filter((v) => (v.webformatWidth / v.webformatHeight) >= 1.0).map((v) => {
        return v.webformatURL.replace(/_640\.(\w+)$/, '_960.$1')
      })} />
    </fragment>
}

Pixabay.propTypes = {
  query: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
}
