import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/blog-card'
import Category from '../components/category'

class CategoryList extends React.Component {
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
        <Category
          name="Category"
          desc="รวมประเภท Blog ไว้ให้ง่ายต่อการเข้าถึง"
        />
        {this.props.data.allCategoriesJson.edges.map(({node}) => {
          return (
            <Card
              key={'category/' + node.key}
              slug={'category/' + node.key}
              banner={
                this.props.data[node.key].edges[0].node.frontmatter.banner
                  .childImageSharp.fluid
              }
              title={node.name}
              subtitle={node.desc}
              status="published"
              link={true}
            />
          )
        })}
      </Layout>
    )
  }
}

export default CategoryList

export const pageQuery = graphql`
  query categoryPageQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    allCategoriesJson(sort: {fields: [key], order: ASC}) {
      edges {
        node {
          key
          name
          desc
        }
      }
    }
    lifestyle: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "lifestyle"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            banner {
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
          }
        }
      }
    }
    misc: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "misc"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            banner {
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
          }
        }
      }
    }
    music: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "music"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            banner {
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
          }
        }
      }
    }
    programming: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "programming"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            banner {
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
          }
        }
      }
    }
    review: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "review"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            banner {
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
          }
        }
      }
    }
    tutorial: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "tutorial"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            banner {
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
          }
        }
      }
    }
    banner: file(relativePath: {eq: "404.jpg"}) {
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
  }
`

CategoryList.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.string,
        description: PropTypes.string,
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
    allCategoriesJson: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  location: PropTypes.object,
}
