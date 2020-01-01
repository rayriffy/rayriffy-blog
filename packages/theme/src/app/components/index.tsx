import React from 'react'

import Dev from './dev'
import Footer from './footer'
import Global from './global'
import Header from './header'
import Helmet from './helmet'

const Component: React.FC = props => {
  const { children } = props
  const { GATSBY_ENV = 'production' } = process.env

  return (
    <React.Fragment>
      <Helmet />
      <Global />
      {GATSBY_ENV !== 'production' ? <Dev /> : null}
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default Component
