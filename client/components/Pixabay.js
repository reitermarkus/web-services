import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Slider from './Slider'

// Uncache by visiting /api/pixabay/del?q=QUERY
export default class Pixabay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: this.props.query,
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

  fetchData() {
    fetch(`https://pixabay.com/api/?q=${this.state.query}&image_type=photo&category=nature&key=${this.props.apiKey}`)
      .then(res => res.json())
      .then(res => {
        let data = res

        data.query = this.state.query
        data.time = Date.now()

        axios.post('/api/pixabay/cache', data)
          .catch(function(error) {
            console.error(error) // eslint-disable-line no-console
          })

        this.updateState(res)
      })
  }

  componentDidMount() {
    // Pixabay invalidates image-links after some time.
    // At the moment we assume it is about 24 hours. So we store the time, when we cached the entry.
    // If the time exceeds the given delta, we refetch data from Pixabay.
    const dayInMS = 86400000

    axios.post('/api/pixabay/find', {query: this.state.query})
      .then(res => res.data)
      .then(res => {
        if (!res || (Date.now() - res.time) > dayInMS) {
          this.fetchData()
        } else {
          this.updateState(res)
        }
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
