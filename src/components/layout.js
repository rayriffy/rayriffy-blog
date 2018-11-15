import React from 'react'
import { Link } from 'gatsby'

import Footer from './footer'
import layoutStyle from './layout.module.css'
import logo from '../assets/LOGO-C-min.png'

class Template extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div className={layoutStyle.cover}>
        <div className={[layoutStyle.container]}>
          <div className={[layoutStyle.header]}>
            <Link to={'/'}><img src='/logo.png' /></Link>
          </div>
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Template
