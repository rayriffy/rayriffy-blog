import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import {FaFacebook, FaTwitter} from 'react-icons/fa'

import Layout from '../components/layout'

import Card from '../components/blog-card'
import Chip from '../components/chip'

export default class AuthorListPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const siteDescription = this.props.data.site.siteMetadata.description

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              name: 'name',
              content: 'Category ·' + siteTitle,
            },
            {
              name: 'description',
              content: siteDescription,
            },
            {
              name: 'author',
              content: siteAuthor,
            },
            {
              name: 'image',
              content: siteUrl + '/default.jpg',
            },
            {
              name: 'og:url',
              content: siteUrl,
            },
            {
              name: 'og:type',
              content: 'article',
            },
            {
              name: 'og:locale',
              content: 'th_TH',
            },
            {
              name: 'og:locale:alternate',
              content: 'en_US',
            },
            {
              name: 'og:title',
              content: 'Category ·' + siteTitle,
            },
            {
              name: 'og:description',
              content: siteDescription,
            },
            {
              name: 'article:author',
              content: 'https://facebook.com/rayriffy',
            },
            {
              name: 'og:image',
              content: siteUrl + '/default.jpg',
            },
            {
              name: 'og:image:secure_url',
              content: siteUrl + '/default.jpg',
            },
            {
              name: 'og:image:alt',
              content: 'banner',
            },
            {
              name: 'twitter:card',
              content: 'summary_large_image',
            },
            {
              name: 'twitter:site',
              content: '@rayriffy',
            },
            {
              name: 'twitter:creator',
              content: '@rayriffy',
            },
            {
              name: 'twitter:title',
              content: 'Category ·' + siteTitle,
            },
            {
              name: 'twitter:description',
              content: siteDescription,
            },
            {
              name: 'twitter:image',
              content: siteUrl + '/default.jpg',
            },
          ]}
          title={`Category · ${siteTitle}`}>
          <script type="application/ld+json" data-react-helmet="true">
            {`
              {
                "@context": "http://schema.org/",
                "@type" : "Website",
                "url" : "${siteUrl}"
              }
            `}
          </script>
        </Helmet>
        <Chip name="Authors" />
        {this.props.data.allAuthorsJson.edges.map(({node}) => {
          return (
            <Card
              key={'author/' + node.user}
              slug={'author/' + node.user}
              banner={this.props.data[node.user].childImageSharp.fluid}
              title={node.name}
              status="published"
              link={true}>
              <FaFacebook />{' '}
              <a href={node.facebook} rel="noopener noreferrer" target="_blank">
                {node.facebook.split('/')[3]}
              </a>
              <br />
              <FaTwitter />{' '}
              <a
                href={'https://twitter.com/' + node.twitter.split('@')[1]}
                rel="noopener noreferrer"
                target="_blank">
                {node.twitter}
              </a>
            </Card>
          )
        })}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query authorPageQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    allAuthorsJson(sort: {fields: [name], order: ASC}) {
      edges {
        node {
          user
          name
          facebook
          twitter
        }
      }
    }
    rayriffy: file(relativePath: {eq: "rayriffy.jpg"}) {
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
    SiriuSStarS: file(relativePath: {eq: "SiriuSStarS.jpg"}) {
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

AuthorListPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.string,
        description: PropTypes.string,
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
    allAuthorsJson: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  location: PropTypes.object,
}
