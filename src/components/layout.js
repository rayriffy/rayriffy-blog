import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'
import Footer from './footer'
import headerStyle from './head.module.css'
import Style from './theme.module.css'

class Template extends React.Component {
  render() {
    const { children } = this.props
    let header = (
      <div className={[headerStyle.header]}>
        <Link to={'/'}><img src="/img/LOGO-C-min.png" /></Link>
      </div>
    )
    return (
      <div className={headerStyle.cover}>
        <div className={[Style.container]}>
          {header}
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Template
