import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/blog-card'
import Chip from '../components/chip'
import Navbar from '../components/navbar'
import Pagination from '../components/pagination'

export default class AuthorTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const posts = this.props.data.allMarkdownRemark.edges
    const author = this.props.data.authorsJson
    const authorName = author.name
    const authorDescription = 'List of blogs wriiten by ' + authorName
    const bannerUrl = this.props.data[author.user].childImageSharp.fluid.src
    const {currentPage, numPages, pathPrefix} = this.props.pageContext
    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              name: 'name',
              content: authorName,
            },
            {
              name: 'description',
              content: authorDescription,
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
              content: authorName,
            },
            {
              name: 'og:description',
              content: authorDescription,
            },
            {
              name: 'article:author',
              content: author.facebook,
            },
            {
              name: 'og:image',
              content: siteUrl + bannerUrl,
            },
            {
              name: 'og:image:secure_url',
              content: siteUrl + bannerUrl,
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
              content: author.twitter,
            },
            {
              name: 'twitter:creator',
              content: author.twitter,
            },
            {
              name: 'twitter:title',
              content: authorName,
            },
            {
              name: 'twitter:description',
              content: authorDescription,
            },
            {
              name: 'twitter:image',
              content: siteUrl + bannerUrl,
            },
          ]}
          title={`${authorName} · ${siteTitle}`}>
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
        <Chip name={authorName.split(' ')[0]} desc={authorName.split(' ')[1]} />
        <Navbar
          align="center"
          keys="navAuthor"
          tabs={[
            {
              name: 'Facebook',
              href: author.facebook,
              newtab: true,
            },
            {
              name: 'Twitter',
              href: 'https://twitter.com/' + author.twitter.split('@')[1],
              newtab: true,
            },
          ]}
        />
        {posts.map(({node}) => {
          return (
            <Card
              key={node.fields.slug}
              slug={node.fields.slug}
              author={this.props.data.authorsJson}
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
  query AuthorPage(
    $author: String!
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
      }
    }
    authorsJson(user: {eq: $author}) {
      user
      name
      facebook
      twitter
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {status: {ne: $status}, author: {regex: $regex}}}
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
    rayriffy: file(relativePath: {eq: "rayriffy.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 90) {
          src
        }
      }
    }
    SiriuSStarS: file(relativePath: {eq: "SiriuSStarS.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 90) {
          src
        }
      }
    }
  }
`

AuthorTemplate.propTypes = {
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
    authorsJson: PropTypes.shape({
      user: PropTypes.string,
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
