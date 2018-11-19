import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/blog-card'

class NotFoundPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout logo={this.props.data.logo.childImageSharp.fluid}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={'Not Found · ' + siteTitle}
        />
        <Card
          banner={this.props.data.banner.childImageSharp.fluid}
          title='NOT FOUND'
          subtitle='You just hit a route that doesn&#39;t exist.'
          link={false}
        />
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    banner: file(relativePath: { eq: "404.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
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
`
