import React from 'react'
import PropTypes from 'prop-types'
import OpenStreetMap from './OpenStreetMap'
import Weather from './Weather'
import Exchange from './Exchange'
import Distance from './Distance'
import Pixabay from './Pixabay'

const Article = (props) =>
  <article>
    <div className='description'>
      <h2>{props.name}</h2>
    </div>
    <Pixabay query={props.name} apiKey={process.env.PIXABAY_API_KEY}/>
    <OpenStreetMap lat={props.lat} lon={props.lon}/>
    <Distance from='Telfs' to={props.name} coordTo={{lat: props.lat, lon: props.lon}} apiKey={process.env.GOOGLE_API_KEY}/>
    <Weather id={props.weatherid} apiKey={process.env.OPENWEATHERMAP_API_KEY}/>
    <Exchange to='USD'/>
  </article>

export default Article

Article.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  weatherid: PropTypes.string.isRequired,
}
