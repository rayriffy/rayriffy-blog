import React from 'react'

import { Box, Flex, Link } from 'rebass'

import Navbar from './navbar'

const Component: React.SFC = () => {
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
    <Box mt={[4, 4, 5, 5]} mb={4} backgroundColor={`rgba(245, 245, 245, 1)`}>
      <Flex justifyContent={`center`}>
        <Box width={[1/6, 1/8, 1/10, 1/15]} mb={3}>
          <Link href={`/`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370.1 512">
              <path
                fill="#4b6fff"
                d="M320.61,295.5,447.15,512H329.39L208,303.54H180.18V512H77V0H251.12C365.23,0,425.94,54.13,425.94,145.55
                ,425.94,227.47,389.37,277.21,320.61,295.5ZM180.18,87V216.5h70.94c48.28,0,71.69-15.36,71.69-68
                ,0-36.57-23.41-61.44-71.69-61.44Z"
                transform="translate(-77.04)"
              />
            </svg>
          </Link>
        </Box>
      </Flex>
      <Navbar align={`center`} tabs={navTabs} />
    </Box>
  )
}

export default Component
