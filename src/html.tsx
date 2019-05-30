import React from 'react'

interface PropsInterface {
  htmlAttributes: object
  headComponents: object[]
  bodyAttributes: object
  preBodyComponents: object[]
  body: string
  postBodyComponents: object[]
}

const HTML: React.SFC<PropsInterface> = props => {
  const {htmlAttributes, headComponents, bodyAttributes, preBodyComponents, body, postBodyComponents} = props

  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <link href='/icon.png' rel='shortcut icon' type='image/png' />
        <link href='/icon.png' rel='apple-touch-icon-precomposed' />
        <link href='https://fonts.googleapis.com/css?family=Kanit&font-display=swap' rel='stylesheet' />
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        <noscript>
          For full functionality of this site it is necessary to enable
          JavaScript. Here are the
          <a href='https://www.enable-javascript.com/'>
            instructions how to enable JavaScript in your web browser
          </a>
          .
        </noscript>
        {preBodyComponents}
        <div
          key={`body`}
          id='___gatsby'
          dangerouslySetInnerHTML={{__html: body}}
        />
        {postBodyComponents}
      </body>
      <script
        async={true}
        src='//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      />
    </html>
  )
}

export default HTML
