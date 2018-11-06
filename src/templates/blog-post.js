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
    const blogUrl = get(this, 'props.data.site.siteMetadata.siteUrl') + post.fields.slug

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }, { name: 'og:url', content: blogUrl }, { name: 'og:type', content: 'article' }, { name: 'og:title', content: post.frontmatter.title }, { name: 'og:description', content: siteDescription }, { name: 'og:image', content: post.frontmatter.banner }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <div className={[Style.article]}>
          <div className={Style.articleteaser + ' ' + Style.displayblock}>
            <img src={post.frontmatter.banner} />
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
          <div className={Style.navpost}>
            <div className={Style.navcontainer}>
              {
                previous &&
                <Link to={previous.fields.slug} rel="prev">
                  <span className={Style.navmeta}>PREVIOUS</span>
                  <span className={Style.navtitle}>{previous.frontmatter.title}</span>
                </Link>
              }
            </div>
            <div className={Style.navcontainer}>
              {
                next &&
                <Link to={next.fields.slug} rel="next">
                  <span className={Style.navmeta}>NEXT</span>
                  <span className={Style.navtitle}>{next.frontmatter.title}</span>
                </Link>
              }
            </div>
          </div>
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
        banner
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
