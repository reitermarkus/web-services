import React from 'react'
import Slider from './Slider'
import Weather from './Weather'

const Article = () =>
  <article>
    <Slider images={[
      'https://static.pexels.com/photos/414459/pexels-photo-414459.jpeg',
      'https://static.pexels.com/photos/355241/pexels-photo-355241.jpeg',
      'https://static.pexels.com/photos/161039/panorama-roppen-village-mountains-161039.jpeg',
      'https://static.pexels.com/photos/414369/pexels-photo-414369.jpeg',
    ]} />
  </article>

export default Article
