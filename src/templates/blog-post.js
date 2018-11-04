import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'
import Style from '../components/theme.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.frontmatter.subtitle
    const { previous, next } = this.props.pageContext
    const imgUrl = 'https://storage.rayriffy.com' + post.fields.slug + 'banner.jpg'
    const blogUrl = 'https://blog.rayriffy.com' + post.fields.slug

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }, { name: 'og:url', content: blogUrl }, { name: 'og:type', content: 'article' }, { name: 'og:title', content: post.frontmatter.title }, { name: 'og:description', content: siteDescription }, { name: 'og:image', content: imgUrl }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <div className={[Style.article]}>
          <div className={Style.articleteaser + ' ' + Style.displayblock}>
            <img src={imgUrl} />
          </div>
          <h1
            style={{
              marginBottom: rhythm(1 / 4),
            }}
            className={Style.articletitle}
          >
            {post.frontmatter.title}
          </h1>
          <div className={Style.articlemeta}>
            Written by Phumrapee Limpianchop on {post.frontmatter.date}
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />

          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none',
              padding: 0,
            }}
          >
            <li>
              {
                next &&
                <Link to={next.fields.slug} rel="next">
                  PREVIOUS: {next.frontmatter.title}
                </Link>
              }
            </li>
            <li>
              {
                previous &&
                <Link to={previous.fields.slug} rel="prev">
                  NEXT: {previous.frontmatter.title}
                </Link>
              }
            </li>
          </ul>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
