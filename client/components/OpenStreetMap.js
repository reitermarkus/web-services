import React from 'react'
import PropTypes from 'prop-types'

const OpenStreetMap = (props) => {
  const lat = props.lat
  const lon = props.lon
  const zoom = 1 / props.zoom

  const baseURL = 'https://www.openstreetmap.org'
  const url = `${baseURL}/export/embed.html?bbox=${lon - zoom}%2C${lat - zoom}%2C${lon + zoom}%2C${lat + zoom}&layer=mapnik&marker=${lat}%2C${lon}`
  const lurl = `${baseURL}/?mlat=${lat}&mlon=${lon}#map=19/${lat}/${lon}&layers=N`

  return <div className='openstreetmap'>
    <iframe src={url}></iframe>
    <a href={lurl} target='_blank'>bigger</a>
  </div>
}

export default OpenStreetMap

OpenStreetMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  zoom: PropTypes.number,
}

OpenStreetMap.defaultProps = {
  zoom: 100,
}
