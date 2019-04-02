import {graphql} from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import {FluidObject} from 'gatsby-image'

import {Layout} from '../components/layout'

import {Card} from '../components/card'
import {Chip} from '../components/chip'
import {Navbar} from '../components/navbar'
import {Pagination} from '../components/pagination'

interface PropsInterface {
  location: object,
  pageContext: {
    currentPage: number,
    numPages: number,
    pathPrefix: string,
  },
  data: {
    [key: string]: any,
    site: {
      siteMetadata: {
        title: string,
        siteUrl: string,
        author: string,
        fbApp: string,
      },
    },
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string,
          },
          frontmatter: {
            title: string,
            subtitle: string,
            date: string,
            featured: boolean,
            status: string,
            banner: {
              childImageSharp: {
                fluid: FluidObject,
              },
            },
          },
        },
      }[],
    },
    authorsJson: {
      user: string,
      name: string,
      facebook: string,
      twitter: string,
    },
  },
}
export default class AuthorTemplate extends React.Component<PropsInterface> {
  public render(): object {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const posts = this.props.data.allMarkdownRemark.edges
    const author = this.props.data.authorsJson
    const authorName = author.name
    const authorDescription = 'List of blogs wriiten by ' + authorName
    const bannerUrl = this.props.data[author.user].childImageSharp.fluid.src
    const {currentPage, numPages, pathPrefix} = this.props.pageContext
    const facebookAppID = this.props.data.site.siteMetadata.fbApp
    const {0: authorFirstName, [authorName.split(' ').length - 1]: authorLastName} = authorName.split(' ')

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              content: `${siteTitle} · ${authorName}`,
              name: 'name',
            },
            {
              content: authorDescription,
              name: 'description',
            },
            {
              content: siteAuthor,
              name: 'author',
            },
            {
              content: siteUrl + bannerUrl,
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
              content: `${siteTitle} · ${authorName}`,
              property: 'og:title',
            },
            {
              content: authorDescription,
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
              content: siteUrl + bannerUrl,
              property: 'og:image',
            },
            {
              content: siteUrl + bannerUrl,
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
              content: `${siteTitle} · ${authorName}`,
              name: 'twitter:title',
            },
            {
              content: authorDescription,
              name: 'twitter:description',
            },
            {
              content: siteUrl + bannerUrl,
              name: 'twitter:image',
            },
          ]}
          title={`${siteTitle} · ${authorName}`}
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
        <Chip name={authorFirstName} desc={authorLastName} />
        <Navbar
          align='center'
          keys='navAuthor'
          tabs={[
            {
              href: author.facebook,
              name: 'Facebook',
              newtab: true,
            },
            {
              href: 'https://twitter.com/' + author.twitter.split('@')[1],
              name: 'Twitter',
              newtab: true,
            },
          ]}
        />
        {posts.map(({node}) => {
          return (
            <Card
              key={node.fields.slug}
              slug={node.fields.slug}
              author={this.props.data.authorsJson}
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
          pathPrefix={pathPrefix}
        />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query AuthorPage(
    $author: String!
    $limit: Int!
    $regex: String!
    $skip: Int!
    $status: String!
  ) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        fbApp
      }
    }
    authorsJson(user: {eq: $author}) {
      user
      name
      facebook
      twitter
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {status: {ne: $status}, author: {regex: $regex}}}
      limit: $limit
      skip: $skip
    ) {
      totalCount
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
    rayriffy: file(relativePath: {eq: "rayriffy.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 90) {
          src
        }
      }
    }
    SiriuSStarS: file(relativePath: {eq: "SiriuSStarS.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 90) {
          src
        }
      }
    }
  }
`
