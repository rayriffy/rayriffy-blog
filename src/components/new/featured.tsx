import React from 'react'

import head from 'lodash/head'

import { graphql, StaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Box, Card, Heading, Link, Text } from 'rebass'
import styled from 'styled-components'

interface IGatsbyImage {
  height?: number
}

interface IPost {
  node: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      subtitle: string
      banner: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }
  }
}

interface IData {
  allMarkdownRemark: {
    edges: IPost[]
  }
}

const GatsbyImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: ${(props: IGatsbyImage) => props.height || 'auto'};
`

const FeaturedRenderer = (data: IData) => {
  const featured: IPost | any = head(data.allMarkdownRemark.edges)

  return (
    <Link href={`${featured.node.fields.slug}`}>
    <Card color='white' bg='rgba(0,0,0,0.3)' style={{ position: 'relative' }}>
      <GatsbyImage fluid={featured.node.frontmatter.banner.childImageSharp.fluid} />
      <Box px={[3, 3, 4, 4]} pb={[3, 3, 4, 4]} style={{ position: 'absolute', left: '0', bottom: '0' }}>
        <Text fontSize={[14, 16, 18, 20]} mb={2}>FEATURED</Text>
        <Heading fontSize={[24, 28, 32, 36]}>{featured.node.frontmatter.title}</Heading>
        <Text fontSize={[16, 18, 20, 22]}>{featured.node.frontmatter.subtitle}</Text>
      </Box>
    </Card>
    </Link>
  )
}

const Featured: React.SFC  = () => {
  return (
    <StaticQuery
      query={graphql`
        query FeaturedQuery {
          allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {featured: {eq: true}}}, limit: 1) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  subtitle
                  author
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
            }
          }
        }        
      `}
      render={FeaturedRenderer}
      />
  )
}

export default Featured
