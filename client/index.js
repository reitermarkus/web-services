import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import SearchForm from './components/SearchForm'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App);
render(SearchForm);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
  module.hot.accept('./components/App', () => { render(SearchForm) })
}
