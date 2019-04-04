import {graphql} from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import {Layout} from '../components/layout'

import {Card} from '../components/card'
import {Chip} from '../components/chip'

interface PropsInterface {
  location: object,
  data: {
    [key: string]: any,
    site: {
      siteMetadata: {
        title: string,
        siteUrl: string,
        author: string,
        description: string,
        fbApp: string,
      },
    },
    allCategoriesJson: {
      edges: {
        node: {
          key: string,
          name: string,
          desc: string,
        },
      }[],
    },
  },
}
export default class CategoryListPage extends React.Component<PropsInterface> {
  public render(): object {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const siteDescription = this.props.data.site.siteMetadata.description
    const facebookAppID = this.props.data.site.siteMetadata.fbApp

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              content: `${siteTitle} · Category`,
              name: 'name',
            },
            {
              content: siteDescription,
              name: 'description',
            },
            {
              content: siteAuthor,
              name: 'author',
            },
            {
              content: `${siteUrl}/default.jpg`,
              name: 'image',
            },
            {
              content: siteUrl,
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
              content: `${siteTitle} · Category`,
              property: 'og:title',
            },
            {
              content: siteDescription,
              property: 'og:description',
            },
            {
              content: facebookAppID,
              property: 'fb:app_id',
            },
            {
              content: 'https://facebook.com/rayriffy',
              property: 'article:author',
            },
            {
              content: `${siteUrl}/default.jpg`,
              property: 'og:image',
            },
            {
              content: `${siteUrl}/default.jpg`,
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
              content: '@rayriffy',
              name: 'twitter:site',
            },
            {
              content: '@rayriffy',
              name: 'twitter:creator',
            },
            {
              content: `${siteTitle} · Category`,
              name: 'twitter:title',
            },
            {
              content: siteDescription,
              name: 'twitter:description',
            },
            {
              content: `${siteUrl}/default.jpg`,
              name: 'twitter:image',
            },
          ]}
          title={`${siteTitle} · Category`}
        >
          <script type='application/ld+json' data-react-helmet='true'>
            {`
              {
                "@context": "http://schema.org/",
                "@type" : "Website",
                "url" : "${siteUrl}"
              }
            `}
          </script>
        </Helmet>
        <Chip name='Category' desc='รวมประเภท Blog ไว้ให้ง่ายต่อการเข้าถึง' />
        {this.props.data.allCategoriesJson.edges.map(({node}) => {
          return (
            <Card
              key={`/category/${node.key}`}
              slug={`/category/${node.key}`}
              banner={
                this.props.data[node.key].edges[0].node.frontmatter.banner
                  .childImageSharp.fluid
              }
              title={node.name}
              subtitle={node.desc}
              status='published'
              link={true}
            />
          )
        })}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query categoryPageQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        fbApp
      }
    }
    allCategoriesJson(sort: {fields: [key], order: ASC}) {
      edges {
        node {
          key
          name
          desc
        }
      }
    }
    lifestyle: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "lifestyle"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
    misc: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "misc"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
    music: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "music"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
    programming: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "programming"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
    review: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "review"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
    tutorial: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "tutorial"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
  }
`
