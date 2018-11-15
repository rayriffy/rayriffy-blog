import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'

import Card from '../components/blog-card'
import Pagination from '../components/pagination'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteUrl = get(this, 'props.data.site.siteMetadata.siteUrl')
    const siteDescription = get(this, 'props.data.site.siteMetadata.description')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const { currentPage, numPages } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[
            {
              name: 'description',
              content: siteDescription
            },
            {
              name: 'og:url',
              content: siteUrl
            },
            {
              name: 'og:type',
              content: 'article'
            },
            {
              name: 'og:title',
              content: siteTitle
            },
            {
              name: 'og:description',
              content: siteDescription
            },
            {
              name: 'og:image',
              content: 'https://firebasestorage.googleapis.com/v0/b/rayriffy-blog.appspot.com/o/DEF_IMG.jpg?alt=media'
            },
            {
              name: 'twitter:card',
              content: 'summary_large_image'
            },
            {
              name: 'twitter:site',
              content: '@rayriffy'
            },
            {
              name: 'twitter:creator',
              content: '@rayriffy'
            },
            {
              name: 'twitter:title',
              content: siteTitle
            },
            {
              name: 'twitter:description',
              content: siteDescription
            },
            {
              name: 'twitter:image',
              content: 'https://firebasestorage.googleapis.com/v0/b/rayriffy-blog.appspot.com/o/DEF_IMG.jpg?alt=media'
            },
          ]}
          title={siteTitle}
        />
        {posts.map(({ node }) => {
          return (
            <Card
              slug={node.fields.slug}
              banner={node.frontmatter.banner}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              subtitle={node.frontmatter.subtitle}
              link={true}
            />
          )
        })}
        <Pagination
          numPages={numPages}
          currentPage={currentPage}
        />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
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
            banner
          }
        }
      }
    }
  }
`