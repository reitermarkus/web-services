import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './prototypes'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
