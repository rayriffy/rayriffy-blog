import React from 'react'
import Helmet from 'react-helmet'

import { graphql } from 'gatsby'

import AdSense from 'react-adsense'

import { Box, Flex, Link, Text } from 'rebass'
import styled from 'styled-components'

import Card from '../../../../core/components/card'
import SEO from '../../../../core/components/seo'

import { IProps } from '../@types/IProps'

const NavText = styled(Text)`
  color: rgba(0, 0, 0, 0.8);

  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(255, 255, 255);
    }
  }
`

const NavLink = styled(Link)`
  rgb(83, 106, 144);

  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(21, 142, 255);
    }
  }
`

const BlogViewingComponent: React.FC<IProps> = props => {
  const {previous, next} = props.pageContext
  const {authorsJson, markdownRemark} = props.data

  const {slug} = markdownRemark.fields
  const {title, subtitle, date, banner} = markdownRemark.frontmatter

  const {GATSBY_ENV = 'production'} = process.env

  return (
    <Box>
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
                      <NavText>PREVIOUS</NavText>
                      <NavLink href={previous.fields.slug}>{previous.frontmatter.title}</NavLink>
                    </>
                  ) : null}
                </Box>
                <Box width={1/2} px={2}>
                  {next ? (
                    <>
                      <NavText>NEXT</NavText>
                      <NavLink href={next.fields.slug}>{next.frontmatter.title}</NavLink>
                    </>
                  ) : null}
                </Box>
              </Flex>
            </Box>
          </Card>
        </Box>
      </Flex>
    </Box>
  )
}

export default BlogViewingComponent

export const pageQuery = graphql`
  query BlogViewingComponentQuery($author: String!, $slug: String!) {
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
