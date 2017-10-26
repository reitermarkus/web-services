export default ({ markup, helmet }) =>
  `<!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    </head>
    <body>
      <div id="root">${markup}</div>
      <script type="text/javascript" src="/dist/arriven.bundle.js" async></script>
    </body>
  </html>`
