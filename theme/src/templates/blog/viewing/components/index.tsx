import React from 'react'
import { Helmet } from 'react-helmet'

import { startsWith } from 'lodash'

import AdSense from 'react-adsense'

import styled from '@emotion/styled'
import { Box, Flex, Text } from 'rebass'

import Card from '../../../../core/components/card'
import OneDarkPrism from '../../../../core/components/onedark'
import SEO from '../../../../core/components/seo'
import TransparentLink from '../../../../core/components/transparentLink'

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
    <Box>
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
      <OneDarkPrism />
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
              <>
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
              </>
            ) : null}
            <Box px={[4, 5]} py={2}>
              <hr />
            </Box>
            <Box px={[4, 5]} pb={5}>
              <Flex flexWrap={`wrap`}>
                <Box width={1 / 2} px={2}>
                  {previous ? (
                    <Box>
                      <NavText>PREVIOUS</NavText>
                      <NavLink
                        to={
                          startsWith(previous.slug, '/')
                            ? previous.slug
                            : `/${previous.slug}`
                        }>
                        {previous.title}
                      </NavLink>
                    </Box>
                  ) : null}
                </Box>
                <Box width={1 / 2} px={2}>
                  {next ? (
                    <Box>
                      <NavText>NEXT</NavText>
                      <NavLink
                        to={
                          startsWith(next.slug, '/')
                            ? next.slug
                            : `/${next.slug}`
                        }>
                        {next.title}
                      </NavLink>
                    </Box>
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
