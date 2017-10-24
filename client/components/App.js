import React from 'react'
import Header from './Header'
import SearchForm from './SearchForm'
import Article from './Article'
import Footer from './Footer'

import '../style/App.scss'

const App = () => (
  <div>
    <Header />
    <main>
      <h4>We make sure you&#39;ll be arriven at your destination.</h4>
      <SearchForm />
      <Article />
    </main>
    <Footer />
  </div>
)

export default App
