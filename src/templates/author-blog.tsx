import React from 'react'
import Helmet from 'react-helmet'

import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import { Box, Flex } from 'rebass'

import Card from '../components/card'
import Chip from '../components/chip'
import Navbar from '../components/navbar'
import Pagination from '../components/pagination'

interface IProps {
  location: object
  pageContext: {
    currentPage: number
    numPages: number
    pathPrefix: string
  }
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
            subtitle: string
            date: string
            featured: boolean
            banner: {
              childImageSharp: {
                fluid: FluidObject
              }
            }
          }
        }
      }[]
    }
    authorsJson: {
      user: string
      name: string
      facebook: string
      twitter: string
    }
  }
}

const AuthorBlog: React.SFC<IProps> = props => {
  const posts = props.data.allMarkdownRemark.edges
  const author = props.data.authorsJson
  const authorName = author.name

  const {currentPage, numPages, pathPrefix} = props.pageContext
  const {0: authorFirstName, [authorName.split(' ').length - 1]: authorLastName} = authorName.split(' ')

  return (
    <>
      <Helmet title={authorName} />
      <Chip name={authorFirstName} desc={authorLastName} />
      <Box mb={3}>
        <Navbar
          align={`center`}
          tabs={[
            {
              href: author.facebook,
              name: 'Facebook',
            },
            {
              href: 'https://twitter.com/' + author.twitter.split('@')[1],
              name: 'Twitter',
            },
          ]}
        />
      </Box>
      <Box>
        <Flex justifyContent={`center`}>
          <Box width={[22/24, 22/24, 20/24, 18/24]}>
            <Flex flexWrap={`wrap`}>
              {posts.map(({node}) => {
                return (
                  <Box width={[1, 1, 1/2, 1/2]} p={3} key={node.fields.slug}>
                    <Card
                      slug={node.fields.slug}
                      author={props.data.authorsJson}
                      blog={node.frontmatter}
                      type={`listing`}
                    />
                  </Box>
                )
              })}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Pagination numPages={numPages} currentPage={currentPage} pathPrefix={pathPrefix} />
    </>
  )
}

export default AuthorBlog

export const pageQuery = graphql`
  query AuthorPage($author: String!, $limit: Int!, $regex: String!, $skip: Int!) {
    authorsJson(user: {eq: $author}) {
      user
      name
      facebook
      twitter
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {author: {regex: $regex}}}
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
