import React from 'react'
import Helmet from 'react-helmet'

import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import AdSense from 'react-adsense'

import { Box, Flex, Link, Text } from 'rebass'
import styled from 'styled-components'

import App from '../components/app'
import Card from '../components/card'
import SEO from '../components/seo'

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

const NavText = styled(Text)`
  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(255, 255, 255);
    }
  }
`

const NavLink = styled(Link)`
  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(21, 142, 255);
    }
  }
`

const BlogPost: React.FC<IProps> = props => {
  const {previous, next} = props.pageContext
  const {authorsJson, markdownRemark} = props.data

  const {slug} = markdownRemark.fields
  const {title, subtitle, date, banner} = markdownRemark.frontmatter

  const {GATSBY_ENV = 'development'} = process.env

  return (
    <App>
      <Helmet title={title} />
      <SEO
        title={title}
        subtitle={subtitle}
        banner={banner.childImageSharp.fluid.src}
        author={authorsJson}
        slug={slug}
        date={date}
        type={`article`}
      />
      <Flex justifyContent={`center`}>
        <Box width={[20/24, 18/24, 15/24, 13/24]} mb={4}>
          <Card 
            author={authorsJson}
            blog={{
              banner,
              date,
              title,
            }}
            type={`post`}>
            <Box px={[4, 5, 5]}>
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
                      <NavText color={`rgba(0, 0, 0, 0.8)`}>PREVIOUS</NavText>
                      <NavLink href={previous.fields.slug} color={`rgb(83,106,144)`}>{previous.frontmatter.title}</NavLink>
                    </>
                  ) : null}
                </Box>
                <Box width={1/2} px={2}>
                  {next ? (
                    <>
                      <NavText color={`rgba(0, 0, 0, 0.8)`}>NEXT</NavText>
                      <NavLink href={next.fields.slug} color={`rgb(83,106,144)`}>{next.frontmatter.title}</NavLink>
                    </>
                  ) : null}
                </Box>
              </Flex>
            </Box>
          </Card>
        </Box>
      </Flex>
    </App>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query blogPostQuery($author: String!, $slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        subtitle
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
