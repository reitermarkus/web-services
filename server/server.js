import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import App from '../client/components/App'

const SUCCESS = 200

const serverRenderer = () => {
  return (req, res) => {
    const markup = ReactDOMServer.renderToStaticMarkup(
      <StaticRouter location={ req.url } context={ {} }>
        <App />
      </StaticRouter>
    )

    const helmet = Helmet.renderStatic()

    res.status(SUCCESS).send(
      ReactDOMServer.renderToStaticMarkup(
        <html {...helmet.htmlAttributes.toComponent()}>
          <head>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {helmet.script.toComponent()}
            {helmet.style.toComponent()}
          </head>
          <body {...helmet.bodyAttributes.toComponent()}>
            <div id='root' dangerouslySetInnerHTML={{__html: markup}}/>
            <script src='/arriven.bundle.js' async/>
          </body>
        </html>
      )
    )
  }
}

export default serverRenderer
