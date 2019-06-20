import React from 'react'
import Helmet from 'react-helmet'

import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import AdSense from 'react-adsense'

import { Box, Flex } from 'rebass'

import Card from '../components/new/card'

interface PropsInterface {
  pageContext: {
    next: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
    previous: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
  }
  data: {
    markdownRemark: {
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
      html: string
    }
    authorsJson: {
      user: string
      name: string
      twitter: string
      facebook: string
    }
  }
}

const BlogPost: React.SFC<PropsInterface> = props => {
  const {previous, next} = props.pageContext
  const {authorsJson, markdownRemark} = props.data

  const {GATSBY_ENV = 'development'} = process.env

  return (
    <Flex justifyContent={`center`}>
      <Helmet title={markdownRemark.frontmatter.title} />
      <Box width={[20/24, 18/24, 14/24, 12/24]}>
        <Card author={authorsJson} blog={markdownRemark.frontmatter} type={`post`}>
          <Box px={[4, 5]} pb={5}>
            <div dangerouslySetInnerHTML={{__html: markdownRemark.html}} />
          </Box>
        </Card>
      </Box>
    </Flex>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($author: String!, $slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
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
