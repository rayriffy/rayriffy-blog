import React from 'react'
import { Link } from 'gatsby'

import Footer from './footer'

import layoutStyle from './layout.module.css'

class Template extends React.Component {
  render() {
    const { children } = this.props
    let header = (
      <div className={[layoutStyle.header]}>
        <Link to={'/'}><img src="/img/LOGO-C-min.png" /></Link>
      </div>
    )
    return (
      <div className={layoutStyle.cover}>
        <div className={[layoutStyle.container]}>
          {header}
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Template
