import React from 'react'

import Dev from './dev'
import Footer from './footer'
import Header from './header'
import Helmet from './helmet'

import '../styles/index.styl'

const Component: React.FC = props => {
  const { children } = props
  const { GATSBY_ENV = 'production' } = process.env

  return (
    <React.Fragment>
      <Helmet />
      {GATSBY_ENV !== 'production' ? <Dev /> : null}
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default Component
