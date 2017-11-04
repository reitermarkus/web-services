import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Map extends Component {
  constructor(props) {
    super(props)

    let lat = parseFloat(this.props.lat)
    let lon = parseFloat(this.props.lon)
    let zoom = 1 / parseFloat(this.props.zoom)

    this.state = {
      lat: lat,
      lon: lon,
      zoom: zoom,
      url: `http://www.openstreetmap.org/export/embed.html?bbox=${lon - zoom}%2C${lat - zoom}%2C${lon + zoom}%2C${lat + zoom}&layer=mapnik&marker=${this.props.lat}%2C${this.props.lon}`,
      lurl: `https://www.openstreetmap.org/?mlat=${this.props.lat}&mlon=${this.props.lon}#map=19/${this.props.lat}/${this.props.lon}&layers=N`,
    }
  }

  render = () =>
    <div className='openstreetmap'>
      <iframe src={this.state.url}></iframe>
      <a href={this.state.lurl} target='_blank'>bigger</a>
    </div>
}

Map.propTypes = {
  lat: PropTypes.string.isRequired,
  lon: PropTypes.string.isRequired,
  zoom: PropTypes.string,
}

Map.defaultProps = {
  zoom: 100,
}
