import React from 'react'

interface PropsInterface {
  htmlAttributes: object
  headComponents: object[]
  bodyAttributes: object
  preBodyComponents: object[]
  body: string
  postBodyComponents: object[]

}
export default class HTML extends React.Component<PropsInterface> {
  public render(): object {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <link href='/icon.png' rel='shortcut icon' type='image/png' />
          <link href='/icon.png' rel='apple-touch-icon-precomposed' />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          <noscript>
            For full functionality of this site it is necessary to enable
            JavaScript. Here are the
            <a href='https://www.enable-javascript.com/'>
              instructions how to enable JavaScript in your web browser
            </a>
            .
          </noscript>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id='___gatsby'
            dangerouslySetInnerHTML={{__html: this.props.body}}
          />
          {this.props.postBodyComponents}
        </body>
        <script
          async={true}
          src='//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        />
      </html>
    )
  }
}
