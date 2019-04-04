import {graphql} from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import {FluidObject} from 'gatsby-image'

import {Layout} from '../components/layout'

import {Card} from '../components/card'
import {Chip} from '../components/chip'
import {Pagination} from '../components/pagination'

interface PropsInterface {
  location: object
  pageContext: {
    currentPage: number;
    numPages: number;
    pathPrefix: string;
  }
  data: {
    site: {
      siteMetadata: {
        title: string;
        siteUrl: string;
        author: string;
        fbApp: string;
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: {
        node: {
          excerpt: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            date: string;
            title: string;
            subtitle: string;
            status: string;
            featured: boolean;
            author: string;
            banner: {
              childImageSharp: {
                fluid: FluidObject;
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
    categoriesJson: {
      name: string;
      desc: string;
    };
  }
}
export default class CategoryTemplate extends React.Component<PropsInterface> {
  public render(): object {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const posts = this.props.data.allMarkdownRemark.edges
    const categoryName = this.props.data.categoriesJson.name
    const categoryDescription = this.props.data.categoriesJson.desc
    const bannerUrl = posts[0].node.frontmatter.banner.childImageSharp.fluid.src
    const {currentPage, numPages, pathPrefix} = this.props.pageContext
    const facebookAppID = this.props.data.site.siteMetadata.fbApp

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              content: `${siteTitle} · ${categoryName}`,
              name: 'name',
            },
            {
              content: categoryDescription,
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
              content: `${siteTitle} · ${categoryName}`,
              property: 'og:title',
            },
            {
              content: categoryDescription,
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
              content: '@rayriffy',
              name: 'twitter:site',
            },
            {
              content: '@rayriffy',
              name: 'twitter:creator',
            },
            {
              content: `${siteTitle} · ${categoryName}`,
              name: 'twitter:title',
            },
            {
              content: categoryDescription,
              name: 'twitter:description',
            },
            {
              content: siteUrl + bannerUrl,
              name: 'twitter:image',
            },
          ]}
          title={`${siteTitle} · ${categoryName}`}
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
        <Chip name={categoryName} desc={categoryDescription} />
        {posts.map(({node}) => {
          let author = {
            facebook: 'def',
            name: 'def',
            user: 'def',
          }
          this.props.data.allAuthorsJson.edges.forEach(authorJson => {
            if (authorJson.node.user === node.frontmatter.author) {
              author = authorJson.node
              return true
            }
          })
          return (
            <Card
              key={node.fields.slug}
              slug={node.fields.slug}
              author={author}
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
  query CategoryPage(
    $category: String!
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
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {status: {ne: $status}, category: {regex: $regex}}}
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
    allAuthorsJson {
      edges {
        node {
          user
          name
          facebook
        }
      }
    }
    categoriesJson(key: {eq: $category}) {
      name
      desc
    }
  }
`
