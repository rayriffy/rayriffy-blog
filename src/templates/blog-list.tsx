import {graphql} from 'gatsby'
import _ from 'lodash'
import React from 'react'
import Helmet from 'react-helmet'

import {FluidObject} from 'gatsby-image'

import {Layout} from '../components/layout'

import {Card} from '../components/card'
import {Pagination} from '../components/pagination'

interface PropsInterface {
  location: object
  pageContext: {
    currentPage: number;
    numPages: number;
  }
  data: {
    [key: string]: any;
    site: {
      siteMetadata: {
        author: string;
        description: string;
        title: string;
        siteUrl: string;
        fbApp: string;
      };
    };
    allMarkdownRemark: {
      edges: {
        node: {
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
        };
      }[];
    };
    allAuthorsJson: {
      edges: {
        node: {
          user: string;
          name: string;
          facebook: string;
        };
      }[];
    };
  }
}
export default class BlogIndex extends React.Component<PropsInterface> {
  public render(): object {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const siteDescription = this.props.data.site.siteMetadata.description
    const posts = this.props.data.allMarkdownRemark.edges
    const {currentPage, numPages} = this.props.pageContext
    const facebookAppID = this.props.data.site.siteMetadata.fbApp

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              content: siteTitle,
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
              content: siteTitle,
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
              content: siteTitle,
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
          title={siteTitle}
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
        {posts.map(({node}) => {
          const author: any = _.find(this.props.data.allAuthorsJson.edges, {
            node: {user: node.frontmatter.author},
          })
          return (
            <Card
              key={node.fields.slug}
              slug={node.fields.slug}
              author={author.node}
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
          pathPrefix='/'
        />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query blogPageQuery($limit: Int!, $skip: Int!, $status: String!) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        fbApp
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip
      filter: {frontmatter: {status: {ne: $status}, type: {eq: "blog"}}}
    ) {
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
    allAuthorsJson {
      edges {
        node {
          user
          name
          facebook
        }
      }
    }
  }
`
