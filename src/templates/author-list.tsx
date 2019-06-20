import React from 'react'
import Helmet from 'react-helmet'

import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import { Box, Flex } from 'rebass'

import { FaFacebook, FaTwitter } from 'react-icons/fa'

import Card from '../components/card'
import Chip from '../components/chip'

interface IProps {
  pageContext: {
    authors: {
      user: string
      name: string
      facebook: string
      twitter: string
      banner: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }[]
  }
}

const AuthorList: React.SFC<IProps> = props => {
  const {authors = []} = props.pageContext

  return (
    <Box mb={4}>
      <Helmet title={`Authors`} />
      <Chip name="Authors" />
      <Box>
        <Flex justifyContent={`center`}>
          <Box width={[22/24, 22/24, 20/24, 18/24]}>
            <Flex flexWrap={`wrap`}>
              {authors.map(author => {
                return (
                  <Box width={[1, 1, 1/2, 1/2]} p={3} key={`author-${author.user}`}>
                    <Card
                      slug={`/author/${author.user}`}
                      blog={{
                        banner: author.banner,
                        title: author.name,
                      }}
                      type={`listing`}
                    >
                      <Box px={4} pb={4}>
                        <FaFacebook />{' '}
                        <a href={author.facebook} rel="noopener noreferrer" target="_blank">
                          {author.facebook.split('/')[3]}
                        </a>
                        <br />
                        <FaTwitter />{' '}
                        <a href={'https://twitter.com/' + author.twitter.split('@')[1]} rel="noopener noreferrer" target="_blank">
                          {author.twitter}
                        </a>
                      </Box>
                    </Card>
                  </Box>
                )
              })}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default AuthorList
