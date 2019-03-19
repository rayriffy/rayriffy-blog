import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/blog-card'
import Chip from '../components/chip'
import Pagination from '../components/pagination'

export default class CategoryTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const posts = this.props.data.allMarkdownRemark.edges
    const categoryName = this.props.data.categoriesJson.name
    const categoryDescription = this.props.data.categoriesJson.desc
    const bannerUrl = posts[0].node.frontmatter.banner.childImageSharp.fluid.src
    const {currentPage, numPages, pathPrefix} = this.props.pageContext
    const facebookAppID = this.props.data.site.siteMetadata.fbApp


    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              name: 'name',
              content: `${siteTitle} · ${categoryName}`,
            },
            {
              name: 'description',
              content: categoryDescription,
            },
            {
              name: 'author',
              content: siteAuthor,
            },
            {
              name: 'image',
              content: siteUrl + bannerUrl,
            },
            {
              property: 'og:url',
              content: siteUrl,
            },
            {
              property: 'og:type',
              content: 'article',
            },
            {
              property: 'og:locale',
              content: 'th_TH',
            },
            {
              property: 'og:locale:alternate',
              content: 'en_US',
            },
            {
              property: 'og:title',
              content: `${siteTitle} · ${categoryName}`,
            },
            {
              property: 'og:description',
              content: categoryDescription,
            },
            {
              property: 'fb:app_id',
              content: facebookAppID,
            },
            {
              property: 'article:author',
              content: 'https://facebook.com/rayriffy',
            },
            {
              property: 'og:image',
              content: siteUrl + bannerUrl,
            },
            {
              property: 'og:image:secure_url',
              content: siteUrl + bannerUrl,
            },
            {
              property: 'og:image:alt',
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
              content: `${siteTitle} · ${categoryName}`,
            },
            {
              name: 'twitter:description',
              content: categoryDescription,
            },
            {
              name: 'twitter:image',
              content: siteUrl + bannerUrl,
            },
          ]}
          title={`${siteTitle} · ${categoryName}`}>
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
        <Chip name={categoryName} desc={categoryDescription} />
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
          pathPrefix={pathPrefix}
        />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query CategoryPage(
    $category: String!
    $limit: Int!
    $regex: String!
    $skip: Int!
    $status: String!
  ) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        fbApp
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {status: {ne: $status}, category: {regex: $regex}}}
      limit: $limit
      skip: $skip
    ) {
      totalCount
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
    categoriesJson(key: {eq: $category}) {
      name
      desc
    }
  }
`

CategoryTemplate.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.string,
        description: PropTypes.string,
        title: PropTypes.string,
        siteUrl: PropTypes.string,
        fbApp: PropTypes.string,
      }),
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
    allAuthorsJson: PropTypes.shape({
      edges: PropTypes.array,
    }),
    categoriesJson: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
    }),
  }),
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
    pathPrefix: PropTypes.string,
  }),
  location: PropTypes.object,
}
