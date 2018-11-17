import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Img from 'gatsby-image'

import Dev from './dev'
import Footer from './footer'
import layoutStyle from './layout.module.css'

class Template extends React.Component {
  render() {
    let devstrip = ''
    if(process.env.deploy !== 'production') {
      devstrip = (
        <Dev />
      )
    }
    const { children } = this.props
    return (
      <div>
      {devstrip}
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
      </div>
    )
  }
}

export default Template