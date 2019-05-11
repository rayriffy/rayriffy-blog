import React from 'react'

import {Dev} from './dev'
import {Footer} from './footer'
import {Header} from './header'

import layoutStyle from './layout.module.css'

interface PropsInterface {
  location?: object,
}
export class Layout extends React.Component<PropsInterface> {
  public render(): object {
    let devStrip: object | null = null

    const {GATSBY_ENV = 'development'} = process.env

    if (GATSBY_ENV !== 'production') {
      devStrip = <Dev />
    }

    const {children} = this.props

    return (
      <div className={layoutStyle.page}>
        {devStrip}
        <div className={layoutStyle.cover}>
          <Header />
          <div className={layoutStyle.container}>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}
