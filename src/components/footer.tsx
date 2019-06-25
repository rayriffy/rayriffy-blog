import React from 'react'

import { Box, Flex, Heading, Link, Text } from 'rebass'
import styled from 'styled-components'

import Logo from './logo'

const NavTitle = styled(Heading)`
  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(255, 255, 255);
    }
  }
`

const NavText = styled(Text)`
  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(192, 192, 192);
    }
  }
`

const NavLink = styled(Link)`
  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(192, 192, 192);
    }
  }
`

const Component: React.SFC = () => {
  const tabs = [
    {
      name: 'general',
      navs: [
        {
          href: '/',
          name: 'Home',
        },
        {
          href: '/category',
          name: 'Categories',
        },
        {
          href: '/author',
          name: 'Authors',
        },
      ]
    },
    {
      name: 'open source',
      navs: [
        {
          href: 'https://blog.rayriffy.com',
          name: 'Blog',
        },
        {
          href: 'https://github.com/rayriffy',
          name: 'GitHub',
        },
        {
          href: 'https://gatsbyjs.org',
          name: 'Gatsby',
        },
      ]
    },
    {
      name: 'contact',
      navs: [
        {
          href: 'mailto:contact@rayriffy.com',
          name: 'Mail',
        },
        {
          href: 'https://m.me/riffyblog',
          name: 'Messenger',
        },
        {
          href: 'https://twitter.com/rayriffy',
          name: 'Twitter',
        },
      ]
    },
  ]

  return (
    <Box pt={4} px={[5, 5, 6, 7]} pb={4}>
      <Box pb={2}>
        <Box width={32}>
          <Logo />
        </Box>
      </Box>
      <Box py={4}>
        <Flex flexWrap={`wrap`} justifyContent={`left`}>
          {tabs.map(tab => (
            <Box width={[1, 1/2, 1/2, 1/3]} py={3} key={`footer-tab-${tab.name}`}>
              <Box pb={3}>
                <NavTitle fontSize={14}>{tab.name.toUpperCase()}</NavTitle>
              </Box>
              <Box>
                <Flex flexWrap={`wrap`}>
                  {tab.navs.map(nav => (
                    <NavLink href={nav.href} key={`nav-${tab.name}-${nav.name}`} color={`rgba(0, 0, 0, 0.6)`} fontSize={16} py={1} width={1}>
                      {nav.name}
                    </NavLink>
                  ))}
                </Flex>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
      <Box pt={2} pb={5}>
        <NavText color={`rgba(0, 0, 0, 0.25)`}>© {(new Date().getFullYear())} Phumrapee Limpianchop</NavText>
      </Box>
    </Box>
  )
}

export default Component
