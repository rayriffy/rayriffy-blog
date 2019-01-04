import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/blog-card'
import Pagination from '../components/pagination'

export default class BlogIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const siteDescription = this.props.data.site.siteMetadata.description
    const posts = this.props.data.allMarkdownRemark.edges
    const {currentPage, numPages} = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              name: 'name',
              content: siteTitle,
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
              content: siteTitle,
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
              content: siteTitle,
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
          title={siteTitle}>
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
        {posts.map(({node}) => {
          var author = null
          this.props.data.allAuthorsJson.edges.forEach(authorJson => {
            if (authorJson.node.user === node.frontmatter.author) {
              author = authorJson.node
              return true
            }
          })
          return (
            <Card
              key={node.fields.slug}
              slug={node.fields.slug}
              author={author}
              banner={node.frontmatter.banner.childImageSharp.fluid}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              subtitle={node.frontmatter.subtitle}
              featured={node.frontmatter.featured}
              status={node.frontmatter.status}
              link={true}
            />
          )
        })}
        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          pathPrefix=""
        />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query blogPageQuery($limit: Int!, $skip: Int!, $status: String!) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip
      filter: {frontmatter: {status: {ne: $status}, type: {eq: "blog"}}}
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            subtitle
            status
            featured
            author
            banner {
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
        }
      }
    }
    allAuthorsJson {
      edges {
        node {
          user
          name
          facebook
        }
      }
    }
  }
`

BlogIndex.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.string,
        description: PropTypes.string,
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
    allAuthorsJson: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
  }),
  location: PropTypes.object,
}
