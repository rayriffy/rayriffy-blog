import React from 'react'
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
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = post.frontmatter.subtitle
    const { previous, next } = this.props.pageContext
    const blogUrl = this.props.data.site.siteMetadata.siteUrl + post.fields.slug

    return (
      <Layout location={this.props.location} logo={this.props.data.logo.childImageSharp.fluid}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[
            {
              name: 'name',
              content: siteTitle
            },
            {
              name: 'description',
              content: siteDescription
            },
            {
              name: 'author',
              content: this.props.data.site.siteMetadata.author
            },
            {
              name: 'image',
              content: this.props.data.site.siteMetadata.siteUrl + post.frontmatter.banner.childImageSharp.fluid.src
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
              name: 'og:locale',
              content: 'th_TH'
            },
            {
              name: 'og:locale:alternate',
              content: 'en_US'
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
              name: 'article:author',
              content: 'https://facebook.com/rayriffy'
            },
            {
              name: 'article:published_time',
              content: post.frontmatter.date
            },
            {
              name: 'og:image',
              content: this.props.data.site.siteMetadata.siteUrl + post.frontmatter.banner.childImageSharp.fluid.src
            },
            {
              name: 'og:image:secure_url',
              content: this.props.data.site.siteMetadata.siteUrl + post.frontmatter.banner.childImageSharp.fluid.src
            },
            {
              name: 'og:image:alt',
              content: 'banner'
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
              content: this.props.data.site.siteMetadata.siteUrl + post.frontmatter.banner.childImageSharp.fluid.src
            },
            {
              name: 'google',
              content: 'nositelinkssearchbox' 
            },
          ]}
          title={`${post.frontmatter.title} · ${siteTitle}`}
        >
          <script type="application/ld+json" data-react-helmet="true">
            {`
              "@context": "http://schema.org/",
              "@type" : "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${this.props.data.site.siteMetadata.siteUrl}"
              },
              "name" : "${post.frontmatter.title}",
              "headline" : "${post.frontmatter.title}",
              "backstory" : "${post.frontmatter.subtitle}",
              "author" : {
                "@type" : "Person",
                "name" : "${this.props.data.site.siteMetadata.author}"
              },
              "datePublished" : "${post.frontmatter.date}",
              "dateModified" : "${post.frontmatter.date}",
              "image" : "${this.props.data.site.siteMetadata.siteUrl + post.frontmatter.banner.childImageSharp.fluid.src}",
              "url" : "${this.props.data.site.siteMetadata.siteUrl + post.fields.slug}",
              "description" : "${post.frontmatter.subtitle}",
              "publisher" : {
                "@type" : "Organization",
                "name" : "${this.props.data.site.siteMetadata.title}",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${this.props.data.site.siteMetadata.siteUrl + '/icon.png'}"
                }
              }
            `}
          </script>
        </Helmet>
        <Card
          slug={post.fields.slug}
          author={this.props.data.site.siteMetadata.author}
          banner={post.frontmatter.banner.childImageSharp.fluid}
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          featured={post.frontmatter.featured}
          status={post.frontmatter.status}
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
        siteUrl
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
        status
        featured
        date(formatString: "DD MMMM, YYYY")
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
