import React from 'react'
import Helmet from 'react-helmet'

import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import { Box, Flex, Link } from 'rebass'

import Card from '../components/card'

interface IProps {
  data: {
    banner: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}

const NotFound: React.SFC<IProps> = props => {
  return (
    <Flex justifyContent={`center`}>
      <Box width={[20/24, 18/24, 14/24, 12/24]} mb={4}>
        <Helmet title={'Not Found'} />
        <Card
          blog={{
            banner: props.data.banner,
            subtitle: `Whoops! Looks like you're lost in the woods...with Cirno.`,
            title: 'Not Found',
          }}
          type={`post`}>
            <Box px={[4, 5]} pb={4}>
              <Link href="/" color={`rgb(83,106,144)`}>Back to home</Link>
            </Box>
        </Card>
      </Box>
    </Flex>
  )
}

export default NotFound

export const pageQuery = graphql`
  query {
    banner: file(relativePath: {eq: "404.jpg"}) {
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
`
