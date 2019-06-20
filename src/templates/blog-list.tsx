import React from 'react'

import filter from 'lodash/filter'
import head from 'lodash/head'

import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import { Box, Flex } from 'rebass'

import Card from '../components/card'
import Featured from '../components/featured'
import Pagination from '../components/pagination'
import SEO from '../components/seo'

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
    numPages: number
    featured: IPost
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
  const {numPages, currentPage, featured} = props.pageContext

  return (
    <>
      <SEO
        author={{
          facebook: 'https://facebook.com/rayriffy',
          name: 'Phumrapee Limpianchop',
          twitter: '@rayriffy',
        }}
        type={`page`} />
      {currentPage === 1 ? (
        <Box my={4}>
          <Flex justifyContent={`center`}>
            <Box width={[1, 18/24, 16/24, 14/24]}>
              <Featured
                title={featured.node.frontmatter.title}
                subtitle={featured.node.frontmatter.subtitle}
                slug={featured.node.fields.slug}
                banner={featured.node.frontmatter.banner}
                featured={true}
              />
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
      <Pagination numPages={numPages} currentPage={currentPage} pathPrefix="/" />
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
