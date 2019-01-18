import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import {rhythm} from '../utils/typography'

import AdSense from 'react-adsense'

import Layout from '../components/layout'

import Navigation from '../components/navigation'
import NavigationContainer from '../components/navigation-container'
import NavigationItem from '../components/navigation-item'

import Card from '../components/blog-card'

export default class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const {previous, next} = this.props.pageContext
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const blogUrl = this.props.data.site.siteMetadata.siteUrl + post.fields.slug
    const blogDescription = post.frontmatter.subtitle
    const author = this.props.data.authorsJson

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              name: 'name',
              content: post.frontmatter.title + '·' + siteTitle,
            },
            {
              name: 'description',
              content: blogDescription,
            },
            {
              name: 'author',
              content: author.name,
            },
            {
              name: 'image',
              content:
                siteUrl + post.frontmatter.banner.childImageSharp.fluid.src,
            },
            {
              name: 'og:url',
              content: blogUrl,
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
              content: post.frontmatter.title,
            },
            {
              name: 'og:description',
              content: blogDescription,
            },
            {
              name: 'article:author',
              content: author.facebook,
            },
            {
              name: 'article:published_time',
              content: post.frontmatter.date,
            },
            {
              name: 'og:image',
              content:
                siteUrl + post.frontmatter.banner.childImageSharp.fluid.src,
            },
            {
              name: 'og:image:secure_url',
              content:
                siteUrl + post.frontmatter.banner.childImageSharp.fluid.src,
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
              content: post.frontmatter.title,
            },
            {
              name: 'twitter:description',
              content: blogDescription,
            },
            {
              name: 'twitter:image',
              content:
                siteUrl + post.frontmatter.banner.childImageSharp.fluid.src,
            },
            {
              name: 'google',
              content: 'nositelinkssearchbox',
            },
          ]}
          title={`${post.frontmatter.title} · ${siteTitle}`}>
          <script type="application/ld+json" data-react-helmet="true">
            {`
              {
                "@context": "http://schema.org/",
                "@type" : "Article",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "${siteUrl}"
                },
                "name" : "${post.frontmatter.title}",
                "headline" : "${post.frontmatter.title}",
                "backstory" : "${post.frontmatter.subtitle}",
                "author" : {
                  "@type" : "Person",
                  "name" : "${author.name}"
                },
                "datePublished" : "${post.frontmatter.date}",
                "dateModified" : "${post.frontmatter.date}",
                "image" : "${siteUrl +
                  post.frontmatter.banner.childImageSharp.fluid.src}",
                "url" : "${siteUrl + post.fields.slug}",
                "description" : "${post.frontmatter.subtitle}",
                "publisher" : {
                  "@type" : "Organization",
                  "name" : "${siteTitle}",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "${siteUrl + '/icon.png'}"
                  }
                }
              }
            `}
          </script>
        </Helmet>
        <Card
          slug={post.fields.slug}
          author={author}
          banner={post.frontmatter.banner.childImageSharp.fluid}
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          featured={post.frontmatter.featured}
          status={post.frontmatter.status}
          link={false}
          content={post.html}>
          <AdSense.Google
            client="ca-pub-2837414306121160"
            slot="7015425171"
            style={{display: 'block'}}
            format="auto"
            responsive="true"
          />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Navigation>
            <NavigationContainer>
              {previous && (
                <NavigationItem
                  slug={previous.fields.slug}
                  meta="previous"
                  title={previous.frontmatter.title}
                />
              )}
            </NavigationContainer>
            <NavigationContainer>
              {next && (
                <NavigationItem
                  slug={next.fields.slug}
                  meta="next"
                  title={next.frontmatter.title}
                />
              )}
            </NavigationContainer>
          </Navigation>
        </Card>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($author: String!, $slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        subtitle
        status
        featured
        date(formatString: "DD MMMM, YYYY")
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
    authorsJson(user: {eq: $author}) {
      user
      name
      twitter
      facebook
    }
  }
`

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.string,
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
    markdownRemark: PropTypes.object,
    authorsJson: PropTypes.object,
  }),
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
  location: PropTypes.object,
}
