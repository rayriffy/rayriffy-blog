import React, { ReactNode } from 'react'

import Img, { FluidObject } from 'gatsby-image'

import styled, { createGlobalStyle } from 'styled-components'

import { Box, Card, Heading, Link, Text } from 'rebass'

interface IProps {
  children?: ReactNode
  blog: {
    title: string
    subtitle?: string
    date: string
    banner: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
  author: {
    name: string
    user: string
  }
  slug?: string
  type: string
}

const GlobalStyle = createGlobalStyle`
  a {
    color: #536a90;
    text-decoration: none;
    cursor: pointer;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
    margin: 35px 0 25px 0;
  }

  p,
  ol,
  table>tbody>tr>td {
    color: rgba(0, 0, 0, 0.6)
  }

  pre {
    padding: 30px;
    background: #fff;
    font: 12px / 18px Consolas, monospace, serif;
    color: #6f6f6f;
    -moz-tab-size: 4;
    tab-size: 4;
    overflow: auto;
    border: 1px solid #eeeeee;
    border-radius: 3px;
  }

  :not(pre)>code {
    font-size: 12px;
    color: #f0615c;
    white-space: pre-wrap;
    padding: 1px 6px 3px 6px;
    border: 1px solid #eeeeee;
    border-radius: 3px;
  }
`

const Banner = styled(Img)`
  border-radius: 6px 6px 0 0;
`

const Component: React.SFC<IProps> = props => {
  const {author, blog, children, slug, type} = props
  const {title, subtitle, banner, date} = blog

  const cardBanner = <Banner fluid={banner.childImageSharp.fluid} />
  const cardTitle = <Heading fontSize={type === 'listing' ? [24, 26, 28, 30] : type === 'post' ? [30, 32, 34, 36] : 38} fontWeight={400} color={`rgb(0, 0, 0)`}>{title}</Heading>

  return (
    <Card backgroundColor={`rgb(255, 255, 255)`} borderRadius={6} boxShadow={`0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`}>
      <GlobalStyle />
      <Box>
        {slug ? <Link href={slug}>{cardBanner}</Link> : cardBanner}
      </Box>
      <Box p={4}>
        {slug ? <Link href={slug}>{cardTitle}</Link> : cardTitle}
        {date && author ? (
          <Text my={3} fontSize={[14, 16]} color={`rgba(0, 0, 0, 0.6)`}>
            Written by <Link href={'/author/' + author.user} color={`rgba(0, 0, 0, 0.8)`}>{author.name}</Link> on {date}
          </Text>
        ) : null}
        {subtitle ? <Text fontSize={[16, 17]} color={`rgba(0, 0, 0, 0.6)`}>{subtitle}</Text> : null}
      </Box>
      {children}
    </Card>
  )
}

export default Component
