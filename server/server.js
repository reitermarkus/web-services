import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Template from './template'
import App from '../client/components/App'
const SUCCESS = 200

const serverRenderer = () => {
  return (req, res) => {
    const markup = ReactDOMServer.renderToString(
      <StaticRouter location={ req.url } context={ {} }>
        <App />
      </StaticRouter>
    )

    const helmet = Helmet.renderStatic()

    res.status(SUCCESS).send(Template({
      markup: markup,
      helmet: helmet,
    }))
  }
}

export default serverRenderer
