import React from 'react'
import Header from './Header'
import SearchForm from './SearchForm'
import Article from './Article'
import Footer from './Footer'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import HttpStatus from 'http-status-codes'
import Status from './Status'
import '../style/App.scss'

const App = () => (
  <div>
    <Helmet htmlAttributes={{lang: 'en', amp: undefined}}>
      <meta name='description' content='We make sure you&#39;ll be arriven at your destination.'/>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <title itemProp='name' lang='en'>arriven</title>
    </Helmet>
    <Switch>
      <Route exact path='/' render={() =>
        <div>
          <Header />
          <main>
            <h4>We make sure you&#39;ll be arriveddn at your destination.</h4>
            <SearchForm />
            <Article/>
          </main>
          <Footer />
        </div>
      } />
      <Route render={() => {
        const status = HttpStatus.NOT_FOUND

        return (
          <Status code={status}>
            {status} {HttpStatus.getStatusText(status)}
          </Status>
        )
      }}/>
    </Switch>
  </div>
)

export default App
