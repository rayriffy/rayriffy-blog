import { Link } from 'gatsby'
import React from 'react'

import styled, { createGlobalStyle } from 'styled-components'

import Img, { FluidObject } from 'gatsby-image'

interface PropsInterface {
  author?: {
    user: string
    name: string
    facebook: string
    twitter?: string
  }
  banner: FluidObject
  date?: string
  featured?: boolean
  link: boolean
  slug: string
  subtitle?: string
  title: string
  content?: string
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
  table {
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

const Container = styled.div`
  background: #fff;
  margin-top: 25px;
  padding: 40px;

  @media only screen and (min-width: 960px) {
    margin-top: 45px;
    padding: 70px;
  }
`

const Teaser = styled.div`
  margin: -40px -40px -40px -40px;
  display: block;

  @media only screen and (min-width: 960px) {
    margin: -70px -70px -70px -70px;
  }
`

const Slug = styled.div`
  background-color: #333;
  color: #fff;
  font-weight: bold;
  letter-spacing: .04em;
  padding: .25em .5em;
  position: relative;
  text-transform: uppercase;
  z-index: 2;
  font-size: 26px;
  margin-right: 10px;
  display: inline;

  @media only screen and (max-width: 540px) {
    font-size: 14px;
  }
`

const Banner = styled(Img)`
  margin-top: -45.5px;
  z-index: 1;

  @media only screen and (max-width: 540px) {
    margin-top: -25.5px;
  }
`

const Header = styled.div`
  margin-top: 80px;

  @media only screen and (min-width: 960px) {
    margin-top: 110px;
  }
`

const Title = styled.div`
  font-size: 36px;
  line-height: 46px;
  font-weight: 400;
  text-transform: none;
  
  &>a {
    color: rgba(0, 0, 0, 1.0);
    text-decoration: none;
    cursor: pointer;
  }

  @media only screen and (min-width: 960px) {
    font-size: 38px;
  }
`

const Subtitle = styled.div`
  color: rgba(0,0,0,.6);
  font-style: normal;
  font-weight: 400;
`

const Meta = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 25px;
  margin-top: 25px;

  &>a {
    color: rgba(0, 0, 0, 0.8);
  }
`

const Content = styled.div`
  &>ul>li {
    color: #6f6f6f;
  }
`

const Card: React.SFC<PropsInterface> = props => {
  const {author, banner, date, featured, link, slug, subtitle, title, content, children} = props

  const processedBanner =
    link === true ? (
      <Link to={slug} aria-label={`card-banner-link-${slug}`}>
        <Banner fluid={banner} />
      </Link>
    ) : (
      <Banner fluid={banner} />
    )

  const processedTitle =
    link === true ? (
      <Link to={slug} aria-label={`card-title-link-${slug}`}>
        {title}
      </Link>
    ) : (
      title
    )

  return (
    <Container key={slug}>
      <GlobalStyle />
      <Teaser>
        {featured && <Slug>featured</Slug>}
        {processedBanner}
      </Teaser>
      <Header>
        <Title>{processedTitle}</Title>
        {date && author && (
          <Meta>
            Written by <Link to={'/author/' + author.user}>{author.name}</Link> on {date}
          </Meta>
        )}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Header>
      {content && <Content dangerouslySetInnerHTML={{__html: content}} />}
      {children}
    </Container>
  )
}

export { Card }
