import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Img from 'gatsby-image'

import Footer from './footer'
import layoutStyle from './layout.module.css'

class Template extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div className={layoutStyle.cover}>
        <div className={[layoutStyle.container]}>
          <div className={[layoutStyle.header]}>
            <Link to={'/'}>
              <Img
                fluid={this.props.logo}
              />
            </Link>
          </div>
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Template