import React from 'react'
import PropTypes from 'prop-types'
import OpenStreetMap from './OpenStreetMap'
import Weather from './Weather'
import Distance from './Distance'
import Pixabay from './Pixabay'
import Exchange from './Exchange'
import CountryData from './CountryData'

const Article = (props) =>
  <article>
    <Pixabay title={props.name} query={props.name} apiKey={process.env.PIXABAY_API_KEY}/>
    <section className='content col'>
      <OpenStreetMap lat={props.lat} lon={props.lon}/>
      <Distance to={props.name} coordTo={{lat: props.lat, lon: props.lon}} apiKey={process.env.GOOGLE_API_KEY}/>
      <Weather id={props.weatherid} apiKey={process.env.OPENWEATHERMAP_API_KEY}/>
      <CountryData code={props.countrycode}/>
      <Exchange base={props.currency}/>
    </section>
  </article>

export default Article

Article.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  countrycode: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  weatherid: PropTypes.string.isRequired,
}
