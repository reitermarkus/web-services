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

  componentDidMount() {
    axios.post('/api/pixabay/find', {query: this.state.query})
      .then(res => res.data.first)
      .then(res => {
        if (res.length === 0) {
          fetch(`https://pixabay.com/api/?q=${this.state.query}&image_type=photo&category=nature&key=${this.props.apiKey}`)
            .then(res => res.json())
            .then(res => {
              let postData = res

              postData.query = this.state.query
              axios.post('/api/pixabay/cache', postData)
                .catch(function(error) {
                  console.error(error) // eslint-disable-line no-console
                })
            })
        }
        this.setState({
          data: {
            totalHits: res.totalHits,
            hits: res.hits,
            total: res.total,
          },
        })
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
