import React from 'react'
import Helmet from 'react-helmet'

import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import AdSense from 'react-adsense'

import { Box, Flex, Link, Text } from 'rebass'

import Card from '../components/card'

interface IProps {
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

const BlogPost: React.SFC<IProps> = props => {
  const {previous, next} = props.pageContext
  const {authorsJson, markdownRemark} = props.data

  const {GATSBY_ENV = 'development'} = process.env

  return (
    <Flex justifyContent={`center`}>
      <Helmet title={markdownRemark.frontmatter.title} />
      <Box width={[20/24, 18/24, 14/24, 12/24]}>
        <Card author={authorsJson} blog={markdownRemark.frontmatter} type={`post`}>
          <Box px={[4, 5]}>
            <div dangerouslySetInnerHTML={{__html: markdownRemark.html}} />
          </Box>
          {GATSBY_ENV === 'production' || GATSBY_ENV === 'staging' ? (
            <>
              <Box px={[4, 5]} py={2}>
                <hr />
              </Box>
              <Box>
                <AdSense.Google
                  client="ca-pub-2837414306121160"
                  slot="7015425171"
                  format="auto"
                  responsive="true"
                />
              </Box>
            </>
          ) : null}
          <Box px={[4, 5]} py={2}>
            <hr />
          </Box>
          <Box px={[4, 5]} pb={5}>
            <Flex flexWrap={`wrap`}>
              <Box width={1/2} px={2}>
                {previous ? (
                  <>
                    <Text color={`rgba(0, 0, 0, 0.8)`}>PREVIOUS</Text>
                    <Link href={previous.fields.slug} color={`rgb(83,106,144)`}>{previous.frontmatter.title}</Link>
                  </>
                ) : null}
              </Box>
              <Box width={1/2} px={2}>
                {next ? (
                  <>
                    <Text color={`rgba(0, 0, 0, 0.8)`}>NEXT</Text>
                    <Link href={next.fields.slug} color={`rgb(83,106,144)`}>{next.frontmatter.title}</Link>
                  </>
                ) : null}
              </Box>
            </Flex>
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
