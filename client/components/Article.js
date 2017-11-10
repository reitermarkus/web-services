import React from 'react'
import Distance from './Distance'
import Pixabay from './Pixabay'

const Article = () =>
  <article>
    <Distance from='Innsbruck' to='Vienna' apiKey={process.env.GOOGLE_API_KEY} />
    <Pixabay query='Innsbruck' apiKey={process.env.PIXABAY_API_KEY} />
  </article>

export default Article
