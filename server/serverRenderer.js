import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import App from '../client/components/App'
import HttpStatus from 'http-status-codes'
import { Provider } from 'react-redux'
import store from '../client/store'

const serverRenderer = () => {
  return (req, res) => {
    if (process.env.NODE_ENV === 'development') {
      const whitelist = [
        /^\/sockjs-node\//,
      ]

      if (whitelist.some(regex => req.path.match(regex))) {
        return
      }
    }

    let context = {}

    const markup = ReactDOMServer.renderToStaticMarkup(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    )

    if (context.url) {
      res.writeHead(context.status || HttpStatus.TEMPORARY_REDIRECT, {
        Location: context.url,
      })
      res.end()
    }

    const helmet = Helmet.renderStatic()

    res.status(context.status || HttpStatus.OK).send(
      ReactDOMServer.renderToStaticMarkup(
        <html {...helmet.htmlAttributes.toComponent()}>
          <head>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {helmet.script.toComponent()}
            {helmet.style.toComponent()}
            {process.env.NODE_ENV === 'production' ? <link rel='stylesheet' href='/style.css' /> : null}
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
