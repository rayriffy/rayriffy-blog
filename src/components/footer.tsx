import React from 'react'

import { Box, Flex, Image, Link, Text } from 'rebass'
import styled from 'styled-components'

import Navbar from './navbar'

const Love = styled(Image)`
  height: 17px;
`

const FooterText = styled(Text)`
  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(192, 192, 192);
    }
  }
`

const FooterLink = styled(Link)`
  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(21, 142, 255);
    }
  }
`

const Component: React.SFC = () => {
  const navTabs = [
    {
      href: '/',
      name: 'Home',
      newtab: false,
    },
    {
      href: '/author',
      name: 'Authors',
      newtab: false,
    },
    {
      href: 'mailto:contact@rayriffy.com',
      name: 'Contact',
      newtab: false,
    },
  ]

  return (
    <>
      <Box mt={2}>
        <Flex justifyContent={`center`}>
          <Box width={[22/24, 22/24, 20/24, 18/24]}>
            <Navbar align={`left`} tabs={navTabs} />
          </Box>
        </Flex>
      </Box>
      <Box my={4}>
        <Flex justifyContent={`center`}>
          <FooterText>Built with</FooterText><Love px={1} alt={`love`} src={`https://s.w.org/images/core/emoji/2.4/svg/2764.svg`} /><FooterText>by <FooterLink href={`https://facebook.com/rayriffy`} color={`rgb(83,106,144)`}>r4yr1ffy</FooterLink></FooterText>
        </Flex>
      </Box>
    </>
  )
}

export default Component
