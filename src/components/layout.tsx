import React from 'react'

import {Dev} from './dev'
import {Footer} from './footer'
import {Header} from './header'

import layoutStyle from './layout.module.css'

interface PropsInterface {
  location?: object,
}
const Layout: React.SFC<PropsInterface> = props => {
  const {children} = props

  let devStrip: object | null = null

  const {GATSBY_ENV = 'development'} = process.env

  if (GATSBY_ENV !== 'production') {
    devStrip = <Dev />
  }

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

export {Layout}
