import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Map from './Map'
import Weather from './Weather'
import Exchange from './Exchange'
import Distance from './Distance'
import Pixabay from './Pixabay'

export default class Article extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      lat: this.props.lat,
      lon: this.props.lon,
      weatherid: this.props.weatherid,
    }
  }

  render = () =>
    <article>
      <div className='description'>
        <h2>{this.state.name}</h2>
      </div>
      <Pixabay query={this.state.name} apiKey={process.env.PIXABAY_API_KEY}/>
      <Map lat={this.state.lat} lon={this.state.lon} zoom='100'/>
      <Distance from='Telfs' to={this.state.name} coordTo={{lat: parseFloat(this.state.lat), lon: parseFloat(this.state.lon)}} apiKey={process.env.GOOGLE_API_KEY}/>
      <Weather id={this.state.weatherid} apiKey={process.env.OPENWEATHERMAP_API_KEY}/>
      <Exchange from='EUR' to='USD'/>
    </article>
}

Article.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  lon: PropTypes.string.isRequired,
  weatherid: PropTypes.string.isRequired,
}
