import React from 'react'
import Header from './Header'
import SearchForm from './SearchForm'
import IPLocation from './IPLocation'
import Places from './Places'
import Footer from './Footer'
import AdminLocationView from './admin/LocationView'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import HttpStatus from 'http-status-codes'
import Status from './Status'
import '../style/App.scss'

const App = () =>
  <fragment>
    <Helmet htmlAttributes={{lang: 'en', amp: undefined}}>
      <meta name='description' content='We make sure you&#39;ll be arriven at your destination.'/>
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'/>
      <meta name='theme-color' content='#000000'/>
      <link rel='manifest' href='/manifest.json'/>
      <link rel='shortcut icon' href='/favicon.ico'/>
      <title itemProp='name' lang='en'>arriven</title>
    </Helmet>
    <Switch>
      <Route exact path='/' render={() =>
        <fragment>
          <Header/>
          <main>
            <h4>We make sure you&#39;ll be arriven at your destination.</h4>
            <IPLocation/>
            <SearchForm/>
            <Places query='beach france' apiKey={process.env.GOOGLE_API_KEY} />
          </main>
          <Footer />
        </fragment>
      }/>
      <Route exact path='/admin/location' render={() =>
        <fragment>
          <Header />
          <main>
            <h1>Admin: Location list</h1>
            <AdminLocationView />
          </main>
          <Footer />
        </fragment>
      }/>
      <Route render={() => {
        const status = HttpStatus.NOT_FOUND

        return (
          <Status code={status}>
            {status} {HttpStatus.getStatusText(status)}
          </Status>
        )
      }}/>
    </Switch>
  </fragment>

export default App
