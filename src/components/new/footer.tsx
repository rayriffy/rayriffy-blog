import React from 'react'

import { Box, Flex, Image, Link, Text } from 'rebass'
import styled from 'styled-components'

import Navbar from './navbar'

const Love = styled(Image)`
  height: 17px;
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
          <Text>Built with</Text><Love px={1} src={`https://s.w.org/images/core/emoji/2.4/svg/2764.svg`} /><Text>by <Link href={`https://facebook.com/rayriffy`} color={`rgb(83,106,144)`}>r4yr1ffy</Link></Text>
        </Flex>
      </Box>
    </>
  )
}

export default Component
