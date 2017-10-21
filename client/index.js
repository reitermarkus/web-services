import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Header from './components/Header'
import App from './components/App'
import SearchForm from './components/SearchForm'
import Footer from './components/Footer'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('title')
  )
}

ReactDOM.render(<AppContainer><Header /></AppContainer>, document.getElementById('header'));
render(App);
ReactDOM.render(<AppContainer><SearchForm /></AppContainer>, document.getElementById('content'));
ReactDOM.render(<AppContainer><Footer /></AppContainer>, document.getElementById('footer'));

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
