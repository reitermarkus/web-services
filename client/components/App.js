import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { getUserInfo } from '../jwt'
import HttpStatus from 'http-status-codes'
import PropTypes from 'prop-types'
import Status from './Status'
import Header from './Header'
import AdminLocationView from './admin/LocationView'
import IPLocation from './IPLocation'
import SearchForm from './SearchForm'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import BackgroundSwitcher from './BackgroundSwitcher'
import Notification from './Notification'
import Favourties from './Favourites'
import '../style/App.scss'

const Search = ({ match }) =>
  <fragment>
    <Header/>
    <main>
      <h4>We make sure you&#39;ll be arriven at your destination.</h4>
      <SearchForm query={match.params.query}/>
      <IPLocation/>
    </main>
    <Footer/>
  </fragment>

Search.propTypes = {
  match: PropTypes.object.isRequired,
}

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    getUserInfo()
  }

  render = () =>
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
        <Route exact path='/search' component={Search} />
        <Route path='/search/:query' component={Search}/>
        <Route exact path='/login' render={() =>
          <fragment>
            <Notification />
            <main>
              <Login />
              <BackgroundSwitcher timeout={6000} />
            </main>
          </fragment>
        } />
        <Route exact path='/register' render={() =>
          <fragment>
            <Notification />
            <main>
              <Register />
              <BackgroundSwitcher timeout={6000} />
            </main>
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
        <Route exact path='/user/favourites' render={() =>
          <fragment>
            <Header />
            <Notification />
            <main>
              <Favourties />
            </main>
            <Footer />
          </fragment>
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
    </fragment>
}
