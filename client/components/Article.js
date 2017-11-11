import React from 'react'
import Places from './Places'
import Distance from './Distance'
import Pixabay from './Pixabay'

const Article = () =>
  <article>
    <Places query='beach france' apiKey={process.env.GOOGLE_API_KEY} />
    <Distance from='Innsbruck' to='Vienna' apiKey={process.env.GOOGLE_API_KEY} />
    <Pixabay query='Innsbruck' apiKey={process.env.PIXABAY_API_KEY} />
  </article>

export default Article
