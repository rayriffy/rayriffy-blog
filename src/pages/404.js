import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/blog-card'

export default class NotFoundPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          title={'Not Found · ' + siteTitle}
        />
        <Card
          banner={this.props.data.banner.childImageSharp.fluid}
          title="NOT FOUND"
          subtitle="Whoops! Looks like you&#39;re lost in the woods...with Cirno."
          link={false}>
          <a href="/">Back to home</a>
        </Card>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    banner: file(relativePath: {eq: "404.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 90) {
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

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
    banner: PropTypes.object,
  }),
}
