import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Slider from './Slider'

// Uncache by visiting /api/pixabay/del?q=QUERY
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
    axios.post('/api/pixabay/find', {query: props.query})
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
      <Slider images={this.state.data.hits.filter((v) => (v.webformatWidth / v.webformatHeight).between(1.5, 1.9)).map((v) => {
        return v.webformatURL
      })} />
    </fragment>
}

Pixabay.propTypes = {
  query: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
}
