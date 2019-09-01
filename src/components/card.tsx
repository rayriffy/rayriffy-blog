import React, { ReactNode } from 'react'

import Img, { FluidObject } from 'gatsby-image'

import styled, { createGlobalStyle } from 'styled-components'

import { Box, Card, Heading, Link, Text } from 'rebass'

interface IProps {
  children?: ReactNode
  blog: {
    title: string
    subtitle?: string
    date?: string
    banner?: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
  author?: {
    name: string
    user: string
  }
  slug?: string
  type: 'post' | 'listing'
  boxShadow?: string
}

interface IBlogCard {
  type: 'post' | 'listing'
  boxShadow: string
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
  li,
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

  .gatsby-resp-image-image {
    box-shadow: inset 0px 0px 0px 400px rgb(255, 255, 255) !important;
  }

  @media (prefers-color-scheme: dark) {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    th {
      color: rgb(255, 255, 255);
    }

    a {
      color: rgb(21, 142, 255);
    }

    p,
    ol,
    li,
    table>tbody>tr>td {
      color: rgb(192, 192, 192);
    }

    pre {
      border: 1px solid #424242;
      background: #212121;
      color: #f5f5f5;
    }

    :not(pre)>code {
      background: #292d34;
      color: #ef596f;
    }

    .gatsby-resp-image-image {
      box-shadow: inset 0px 0px 0px 400px rgb(60, 60, 60) !important;
    }
  }
`

const Banner = styled(Img)`
  border-radius: 6px 6px 0 0;
`

const BlogCard = styled(Card)`
  background-color: rgb(255, 255, 255);

  @media (prefers-color-scheme: dark) {
    & {
      background-color: rgb(60, 60, 60);
    }
  }

  ${(props: IBlogCard) => props.type === 'post' ? `
    border-radius: 0 0 6px 6px;
    box-shadow: ${props.boxShadow};
  ` : props.type === 'listing' ? `
    border-radius: 6px;
    box-shadow: ${props.boxShadow};
  ` : `
    border-radius: 6px
    box-shadow: ${props.boxShadow};
  `}
`

const BlogTitle = styled(Heading)`
  color: rgb(0, 0, 0);

  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(222, 222, 222);
    }
  }
`

const BlogText = styled(Text)`
  color: rgba(0, 0, 0, 0.6);

  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(192, 192, 192);
    }
  }
`

const BlogLink = styled(Link)`
  color: rgba(0, 0, 0, 0.8);

  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(255, 255, 255);
    }
  }
`

const Component: React.FC<IProps> = props => {
  const {author, blog, children, slug, type, boxShadow = `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`} = props
  const {title, subtitle, banner, date} = blog

  const cardBanner = banner ? <Banner fluid={banner.childImageSharp.fluid} /> : null
  const cardTitle = <BlogTitle fontSize={type === 'listing' ? [24, 26, 28, 30] : type === 'post' ? [30, 32, 34, 36] : 38} fontWeight={400} fontFamily={`Kanit, sans-serif`}>{title}</BlogTitle>

  return (
    <BlogCard type={type} boxShadow={boxShadow}>
      {type === 'post' ? <GlobalStyle /> : null}
      {banner ? (
        <Box>
          {slug ? <Link href={slug} aria-label={`link-${title}`}>{cardBanner}</Link> : cardBanner}
        </Box>
      ) : null}
      <Box px={type === 'listing' ? 4 : type === 'post' ? [4, 5] : 4} py={4}>
        {slug ? <Link href={slug} aria-label={`link-${title}`}>{cardTitle}</Link> : cardTitle}
        {date && author ? (
          <BlogText fontSize={[14, 16]} mt={3}>
            Written by <BlogLink href={'/author/' + author.user} aria-label={author.name}>{author.name}</BlogLink> on {date}
          </BlogText>
        ) : null}
        {subtitle ? <BlogText fontSize={[16, 17]} mt={3}>{subtitle}</BlogText> : null}
      </Box>
      {children}
    </BlogCard>
  )
}

export default Component
