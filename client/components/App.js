import React, { Component } from 'react'


import Header from './Header'
import SearchForm from './SearchForm'
import Footer from './Footer'

import '../style/App.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <h1>arriven</h1>
          <h4>We make sure you&#39;ll be arriven at your destination.</h4>
          <SearchForm />
        </main>
        <Footer />
      </div>
    )
  }
}
