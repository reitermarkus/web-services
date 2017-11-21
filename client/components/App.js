import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import HttpStatus from 'http-status-codes'
import PropTypes from 'prop-types'
import Status from './Status'
import Header from './Header'
import AdminLocationView from './admin/LocationView'
import IPLocation from './IPLocation'
import SearchForm from './SearchForm'
import Places from './Places'
import Footer from './Footer'
import Login from './Login'
import '../style/App.scss'
import BackgroundSwitcher from './BackgroundSwitcher'

const Search = ({ match }) =>
  <fragment>
    <Header/>
    <main>
      <h4>We make sure you&#39;ll be arriven at your destination.</h4>
      <IPLocation/>
      <SearchForm query={match.params.query}/>
      <Places query='beach france' apiKey={process.env.GOOGLE_API_KEY} />
    </main>
    <Footer />
  </fragment>

Search.propTypes = {
  match: PropTypes.object.isRequired,
}

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
      <Redirect exact from='/' to='/search'/>
      <Route exact path='/search' component={Search}/>
      <Route path='/search/:query' component={Search}/>
      <Route exact path='/login' render={() =>
        <fragment>
          <Header />
          <main>
            <BackgroundSwitcher timeout={6000}>
              <Login />
            </BackgroundSwitcher>
          </main>
          <Footer />
        </fragment>
      } />
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
