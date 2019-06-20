import React from 'react'

import head from 'lodash/head'
import filter from 'lodash/filter'

import { graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Box, Flex, Heading, Link, Text } from 'rebass'

import App from '../components/new/app'
import Card from '../components/new/card'
import Featured from '../components/new/featured'

interface IPost {
  node : {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      subtitle: string
      author: string
      date: string
      featured: boolean
      banner: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }
  }
}

interface IAuthor {
  node: {
    user: string
    name: string
    facebook: string
  }
}

interface IProps {
  pageContext: {
    currentPage: number
  }
  data: {
    allMarkdownRemark: {
      edges: IPost[]
    }
    allAuthorsJson: {
      edges: IAuthor[]
    }
  }
}

const MockPage: React.SFC<IProps> = props => {
  const authors = props.data.allAuthorsJson.edges
  const posts = props.data.allMarkdownRemark.edges
  const {currentPage} = props.pageContext

  return (
    <>
      {currentPage === 1 ? (
        <Box my={4}>
          <Flex justifyContent={`center`}>
            <Box width={[1, 18/24, 16/24, 14/24]}>
              <Featured />
            </Box>
          </Flex>
        </Box>
      ) : null}
      <Box>
        <Flex justifyContent={`center`}>
          <Box width={[22/24, 22/24, 20/24, 18/24]}>
            <Flex flexWrap={`wrap`}>
              {posts.map((post: IPost) => {
                const {fields, frontmatter} = post.node
                const {slug} = fields
                const {author} = frontmatter

                const fetchedAuthor: IAuthor | any = head(filter(authors, (o: IAuthor) => o.node.user === author))

                return (
                  <Box width={[1, 1, 1/2, 1/2]} p={3} key={`listing-${currentPage}-${slug}`}>
                    <Card author={fetchedAuthor.node} blog={frontmatter} slug={slug} type={`listing`} />
                  </Box>
                )
              })}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box my={3}>
        <Text color={`red`} textAlign={`center`}>[WARN] Missing pagination</Text>
      </Box>
    </>
  )
}

export default MockPage

export const pageQuery = graphql`
  query blogListingQuery($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip
      filter: {frontmatter: {type: {eq: "blog"}}}
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
