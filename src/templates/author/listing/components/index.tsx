import React from 'react'
import Helmet from 'react-helmet'

import { Box, Flex } from 'rebass'
import styled from 'styled-components'

import { FaFacebook, FaTwitter } from 'react-icons/fa'

import Card from '../../../../core/components/card'
import Chip from '../../../../core/components/chip'
import SEO from '../../../../core/components/seo'

import { IProps } from '../@types/IProps'

const FacebookIcon = styled(FaFacebook)`
  color: rgb(0, 0, 0);

  @media (prefers-color-scheme: dark) {
    color: rgb(222, 222, 222);
  }
`

const TwitterIcon = styled(FaTwitter)`
  color: rgb(0, 0, 0);

  @media (prefers-color-scheme: dark) {
    color: rgb(222, 222, 222);
  }
`

const AuthorListingComponent: React.FC<IProps> = props => {
  const {authors = []} = props.pageContext

  return (
    <Box>
      <Box mb={4}>
        <Helmet title={`Authors`} />
        <SEO
          title='Authors'
          author={{
            facebook: 'https://facebook.com/rayriffy',
            name: 'Phumrapee Limpianchop',
            twitter: '@rayriffy',
          }}
          type={`page`} />
        <Chip name={`Authors`} />
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
                          <FacebookIcon />{' '}
                          <a href={author.facebook} rel="noopener noreferrer" target="_blank">
                            {author.facebook.split('/')[3]}
                          </a>
                          <br />
                          <TwitterIcon />{' '}
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
    </Box>
  )
}

export default AuthorListingComponent
