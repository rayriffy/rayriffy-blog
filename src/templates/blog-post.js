import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'
import Navigation from '../components/navigation'
import NavigationContainer from '../components/navigation-container'
import NavigationItem from '../components/navigation-item'

import Card from '../components/blog-card'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.frontmatter.subtitle
    const { previous, next } = this.props.pageContext
    const blogUrl = get(this, 'props.data.site.siteMetadata.siteUrl') + post.fields.slug

    console.log(post.frontmatter.banner)

    return (
      <Layout location={this.props.location} logo={this.props.data.logo.childImageSharp.fluid}>
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
              content: post.frontmatter.banner.childImageSharp.fluid.src
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
              content: post.frontmatter.banner.childImageSharp.fluid.src
            },
          ]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <Card
          slug={post.fields.slug}
          banner={post.frontmatter.banner.childImageSharp.fluid}
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          subtitle={post.frontmatter.subtitle}
          link={false}
        >
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Navigation>
            <NavigationContainer>
              {
                previous &&
                <NavigationItem
                  slug={previous.fields.slug}
                  meta='previous'
                  title={previous.frontmatter.title}
                />
              }
            </NavigationContainer>
            <NavigationContainer>
              {
                next &&
                <NavigationItem
                  slug={next.fields.slug}
                  meta='next'
                  title={next.frontmatter.title}
                />
              }
            </NavigationContainer>
          </Navigation>
        </Card>
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
    logo: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 150, quality: 100) {
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
