import React from 'react'
import { Helmet } from 'react-helmet'

import AdSense from 'react-adsense'

import styled from '@emotion/styled'
import { Box, Flex, Text } from 'rebass'

import Card from '../../../../core/components/card'
import SEO from '../../../../core/components/seo'
import TransparentLink from '../../../../core/components/transparentLink'

import '../styles/global.styl'
import '../styles/onedark.styl'

import { IProps } from '../@types/IProps'

const NavText = styled(Text)`
  color: rgba(0, 0, 0, 0.8);

  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(255, 255, 255);
    }
  }
`

const NavLink = styled(TransparentLink)`
  rgb(83, 106, 144);

  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(21, 142, 255);
    }
  }
`

const BlogViewingComponent: React.FC<IProps> = props => {
  const { blog, node } = props.pageContext
  const { next, previous } = blog

  const { title, subtitle, banner, author, slug, date, content } = node

  const { GATSBY_ENV = 'production' } = process.env

  return (
    <React.Fragment>
      <Helmet title={title} />
      <SEO
        title={title}
        subtitle={subtitle}
        banner={banner.localFile.childImageSharp.fluid.src}
        author={author}
        slug={slug}
        date={date}
        type={`article`}
      />
      <Flex justifyContent={`center`}>
        <Box width={[20 / 24, 18 / 24, 15 / 24, 13 / 24]} mb={4}>
          <Card
            author={author}
            blog={{
              banner,
              date,
              title,
            }}
            type={`post`}>
            <Box px={[4, 5, 5]}>
              <div
                dangerouslySetInnerHTML={{
                  __html: content.childMarkdownRemark.html,
                }}
              />
            </Box>
            {GATSBY_ENV === 'production' || GATSBY_ENV === 'staging' ? (
              <React.Fragment>
                <Box px={[4, 5]} py={2}>
                  <hr />
                </Box>
                <Box>
                  <AdSense.Google
                    client='ca-pub-2837414306121160'
                    slot='7015425171'
                    format='auto'
                    responsive='true'
                  />
                </Box>
              </React.Fragment>
            ) : null}
            <Box px={[4, 5]} py={2}>
              <hr />
            </Box>
            <Box px={[4, 5]} pb={5}>
              <Flex flexWrap={`wrap`}>
                <Box width={1 / 2} px={2}>
                  {previous ? (
                    <React.Fragment>
                      <NavText>PREVIOUS</NavText>
                      <NavLink
                        to={
                          previous.slug.startsWith('/')
                            ? previous.slug
                            : `/${previous.slug}`
                        }>
                        {previous.title}
                      </NavLink>
                    </React.Fragment>
                  ) : null}
                </Box>
                <Box width={1 / 2} px={2}>
                  {next ? (
                    <React.Fragment>
                      <NavText>NEXT</NavText>
                      <NavLink
                        to={
                          next.slug.startsWith('/')
                            ? next.slug
                            : `/${next.slug}`
                        }>
                        {next.title}
                      </NavLink>
                    </React.Fragment>
                  ) : null}
                </Box>
              </Flex>
            </Box>
          </Card>
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export default BlogViewingComponent
