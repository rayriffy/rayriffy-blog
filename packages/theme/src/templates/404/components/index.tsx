import React from 'react'
import { Helmet } from 'react-helmet'

import { graphql, useStaticQuery } from 'gatsby'

import { Box, Flex, Text } from 'rebass'

import Card from '../../../core/components/card'
import TransparentLink from '../../../core/components/transparentLink'

import { IData } from '../@types/IData'

const NotFoundComponent: React.FC = () => {
  const data = useStaticQuery<IData>(graphql`
    query NotFoundComponentQuery {
      banner: file(relativePath: { eq: "404.jpg" }) {
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
  `)

  return (
    <Flex justifyContent={`center`}>
      <Box width={[20 / 24, 18 / 24, 14 / 24, 12 / 24]} mb={4}>
        <Helmet title={'Not Found'} />
        <Card
          blog={{
            banner: {
              localFile: data.banner,
            },
            subtitle: `Whoops! Looks like you're lost in the woods...with Cirno.`,
            title: 'Not Found',
          }}
          type={`post`}>
          <Box px={[4, 5]} pb={4}>
            <TransparentLink to={`/`}>
              <Text color={`rgb(21,142,255)`}>Back to home</Text>
            </TransparentLink>
          </Box>
        </Card>
      </Box>
    </Flex>
  )
}

export default NotFoundComponent
