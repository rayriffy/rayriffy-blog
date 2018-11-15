import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'
import Style from '../components/theme.module.css'
import Navigation from '../components/navigation'

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
          meta={[
            {
              name: 'description',
              content: siteDescription
            },
            {
              name: 'og:url',
              content: blogUrl
            },
            {
              name: 'og:type',
              content: 'article'
            },
            {
              name: 'og:title',
              content: post.frontmatter.title
            },
            {
              name: 'og:description',
              content: siteDescription
            },
            {
              name: 'og:image',
              content: post.frontmatter.banner
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
              content: post.frontmatter.title
            },
            {
              name: 'twitter:description',
              content: siteDescription
            },
            {
              name: 'twitter:image',
              content: post.frontmatter.banner
            },
          ]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <div className={[Style.article]}>
          <div className={[Style.articleteaser, Style.displayblock].join(' ')}>
            <img src={post.frontmatter.banner} />
          </div>
          <div className={Style.articlecontent}>
            <h1 className={Style.articletitle}>
              {post.frontmatter.title}
            </h1>
            <div className={Style.articlemeta}>
              Written by Phumrapee Limpianchop on {post.frontmatter.date}
            </div>
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
                <Navigation
                  slug={previous.fields.slug}
                  meta='previous'
                  title={previous.frontmatter.title}
                />
              }
            </div>
            <div className={Style.navcontainer}>
              {
                next &&
                <Navigation
                  slug={next.fields.slug}
                  meta='next'
                  title={next.frontmatter.title}
                />
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
