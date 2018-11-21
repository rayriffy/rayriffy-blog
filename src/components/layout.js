import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import Img from 'gatsby-image'

import Dev from './dev'
import Footer from './footer'
import layoutStyle from './layout.module.css'

class Template extends React.Component {
  render() {
    let devstrip = ''
    if(process.env.GATSBY_ENV !== 'production') {
      devstrip = (
        <Dev />
      )
    }
    const { children } = this.props
    return (
      <div className={layoutStyle.page}>
      {devstrip}
        <div className={layoutStyle.cover}>
          <div className={[layoutStyle.container]}>
            <div className={[layoutStyle.header]}>
              <Link to={'/'}>
                <StaticQuery
                  query={graphql`
                    query LogoQuery {
                      logo: file(relativePath: { eq: "logo.png" }) {
                        childImageSharp {
                          fluid(maxWidth: 150, quality: 100) {
                            base64
                            tracedSVG
                            aspectRatio
                            src
                            srcSet
                            srcWebp
                            srcSetWebp
                            sizes
                          }
                        }
                      }
                    }
                  `}
                  render={data => (
                    <Img
                      fluid={data.logo.childImageSharp.fluid}
                    />
                  )}
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