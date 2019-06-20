import React, { ReactNode } from 'react'

import Img, { FluidObject } from 'gatsby-image'

import { Box, Card, Heading, Link, Text } from 'rebass'

interface IProps {
  children?: ReactNode
  blog: {
    title: string
    subtitle: string
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
}

const Component: React.SFC<IProps> = props => {
  const {author, blog, children, slug} = props
  const {title, subtitle, banner, date} = blog

  const cardBanner = <Img fluid={banner.childImageSharp.fluid} />
  const cardTitle = <Heading fontSize={[24, 26, 28, 30]} fontWeight={400} color={`rgb(0, 0, 0)`}>{title}</Heading>

  return (
    <Card backgroundColor={`rgb(255, 255, 255)`}>
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
        <Text fontSize={[16, 18]} color={`rgba(0, 0, 0, 0.6)`}>{subtitle}</Text>
      </Box>
      {children}
    </Card>
  )
}

export default Component
