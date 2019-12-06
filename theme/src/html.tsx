import React, { ReactNode } from 'react'

interface IProps {
  body: string
  bodyAttributes: string
  headComponents: ReactNode
  htmlAttributes: string
  preBodyComponents: ReactNode
  postBodyComponents: ReactNode
}

const HTMLComponent: React.FC<IProps> = props => {
  const {
    htmlAttributes,
    headComponents,
    bodyAttributes,
    preBodyComponents,
    body,
    postBodyComponents,
  } = props

  const { GATSBY_ENV = 'production' } = process.env

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
        <link
          href='https://fonts.googleapis.com/css?family=Kanit&font-display=swap'
          rel='stylesheet'
        />
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
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>
      {GATSBY_ENV === 'production' || GATSBY_ENV === 'staging' ? (
        <script
          async={true}
          src='//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        />
      ) : null}
    </html>
  )
}

export default HTMLComponent
