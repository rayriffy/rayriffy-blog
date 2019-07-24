import React from 'react'

import { Box, Flex, Link } from 'rebass'

import Logo from './logo'
import Navbar from './navbar'

const Component: React.FC = () => {
  const navTabs = [
    {
      href: '/',
      name: 'home',
    },
    {
      href: '/category',
      name: 'category',
    },
    {
      href: 'https://l.rayriffy.com/nico',
      name: '♪',
    },
  ]

  return (
    <Box mt={[4, 4, 5, 5]} mb={4}>
      <Flex justifyContent={`center`}>
        <Box width={[1/6, 1/8, 1/10, 1/15]} mb={3}>
          <Link href={`/`} aria-label={`logo`}>
            <Logo />
          </Link>
        </Box>
      </Flex>
      <Navbar align={`center`} tabs={navTabs} />
    </Box>
  )
}

export default Component
