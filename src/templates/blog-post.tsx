import {graphql} from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import {rhythm} from '../utils/typography'

import {FluidObject} from 'gatsby-image'
import AdSense from 'react-adsense'

import {Layout} from '../components/layout'

import {Navigation} from '../components/navigation'
import {NavigationContainer} from '../components/navigation-container'
import {NavigationItem} from '../components/navigation-item'

import {Card} from '../components/card'

interface PropsInterface {
  location: object
  pageContext: {
    next: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
    previous: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
  }
  data: {
    site: {
      siteMetadata: {
        author: string;
        description: string;
        title: string;
        siteUrl: string;
        fbApp: string;
      };
    };
    markdownRemark: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        subtitle: string;
        author: string,
        date: string;
        featured: boolean;
        status: string;
        banner: {
          childImageSharp: {
            fluid: FluidObject,
          };
        };
      };
      html: string;
    };
    authorsJson: {
      user: string;
      name: string;
      twitter: string;
      facebook: string;
    };
  }
}
export default class BlogPostTemplate extends React.Component<PropsInterface> {
  public render(): object {
    const post = this.props.data.markdownRemark
    const {previous, next} = this.props.pageContext
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const blogUrl = this.props.data.site.siteMetadata.siteUrl + post.fields.slug
    const blogDescription = post.frontmatter.subtitle
    const author = this.props.data.authorsJson
    const facebookAppID = this.props.data.site.siteMetadata.fbApp

    let ads: object | null = null

    const {GATSBY_ENV = 'development'} = process.env

    if (GATSBY_ENV !== 'development') {
      ads = (
        <AdSense.Google
          client='ca-pub-2837414306121160'
          slot='7015425171'
          style={{display: 'block'}}
          format='auto'
          responsive='true'
        />
      )
    }

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              content: `${siteTitle} · ${post.frontmatter.title}`,
              name: 'name',
            },
            {
              content: blogDescription,
              name: 'description',
            },
            {
              content: author.name,
              name: 'author',
            },
            {
              content:
                siteUrl + post.frontmatter.banner.childImageSharp.fluid.src,
              name: 'image',
            },
            {
              content: blogUrl,
              property: 'og:url',
            },
            {
              content: 'article',
              property: 'og:type',
            },
            {
              content: 'th_TH',
              property: 'og:locale',
            },
            {
              content: 'en_US',
              property: 'og:locale:alternate',
            },
            {
              content: `${siteTitle} · ${post.frontmatter.title}`,
              property: 'og:title',
            },
            {
              content: blogDescription,
              property: 'og:description',
            },
            {
              content: facebookAppID,
              property: 'fb:app_id',
            },
            {
              content: author.facebook,
              property: 'article:author',
            },
            {
              content: post.frontmatter.date,
              property: 'article:published_time',
            },
            {
              content:
                siteUrl + post.frontmatter.banner.childImageSharp.fluid.src,
              property: 'og:image',
            },
            {
              content:
                siteUrl + post.frontmatter.banner.childImageSharp.fluid.src,
              property: 'og:image:secure_url',
            },
            {
              content: 'banner',
              property: 'og:image:alt',
            },
            {
              content: 'summary_large_image',
              name: 'twitter:card',
            },
            {
              content: author.twitter,
              name: 'twitter:site',
            },
            {
              content: author.twitter,
              name: 'twitter:creator',
            },
            {
              content: `${siteTitle} · ${post.frontmatter.title}`,
              name: 'twitter:title',
            },
            {
              content: blogDescription,
              name: 'twitter:description',
            },
            {
              content:
                siteUrl + post.frontmatter.banner.childImageSharp.fluid.src,
              name: 'twitter:image',
            },
            {
              content: 'nositelinkssearchbox',
              name: 'google',
            },
          ]}
          title={`${siteTitle} · ${post.frontmatter.title}`}
        >
          <script type='application/ld+json' data-react-helmet='true'>
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
                    "url": "${`${siteUrl}/icon.png`}"
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
          content={post.html}
        >
          {ads}
          <hr
            style={{
              marginBottom: rhythm(1),
              marginTop: rhythm(1),
            }}
          />
          <Navigation>
            <NavigationContainer>
              {previous && (
                <NavigationItem
                  slug={previous.fields.slug}
                  meta='previous'
                  title={previous.frontmatter.title}
                />
              )}
            </NavigationContainer>
            <NavigationContainer>
              {next && (
                <NavigationItem
                  slug={next.fields.slug}
                  meta='next'
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
        fbApp
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
