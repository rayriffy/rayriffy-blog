import React, { memo } from 'react'

import styled from '@emotion/styled'
import { Box, Flex, Heading, Link, Text } from 'rebass'

import TransparentLink from '../../core/components/transparentLink'

import Logo from './logo'

import { IFooterTab } from '../@types/IFooterTab'

const NavTitle = styled(Heading)`
  @media (prefers-color-scheme: dark) {
    color: rgb(255, 255, 255);
  }
`

const NavText = styled(Text)`
  color: rgba(0, 0, 0, 0.25);

  @media (prefers-color-scheme: dark) {
    color: rgb(192, 192, 192);
  }
`

const NavTextInt = styled(Text)`
  rgba(0, 0, 0, 0.6);

  @media (prefers-color-scheme: dark) {
    color: rgb(192, 192, 192);
  }
`

const NavLinkExt = styled(Link)`
  rgba(0, 0, 0, 0.6);

  @media (prefers-color-scheme: dark) {
    color: rgb(192, 192, 192);
  }
`

const FooterComponent: React.FC = () => {
  const tabs: IFooterTab[] = [
    {
      name: 'general',
      navs: [
        {
          href: '/',
          internal: true,
          name: 'Home',
        },
        {
          href: '/category',
          internal: true,
          name: 'Categories',
        },
        {
          href: '/author',
          internal: true,
          name: 'Authors',
        },
      ],
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
      ],
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
      ],
    },
  ]

  return (
    <Box pt={4} px={[5, 5, 6, 7]} pb={4}>
      <Box pt={2} pb={2}>
        <Box width={32}>
          <Logo />
        </Box>
      </Box>
      <Box py={4}>
        <Flex flexWrap={`wrap`} justifyContent={`left`}>
          {tabs.map(tab => (
            <Box
              width={[1, 1 / 2, 1 / 2, 1 / 3]}
              py={3}
              key={`footer-tab-${tab.name}`}>
              <Box pb={3}>
                <NavTitle fontSize={14}>{tab.name.toUpperCase()}</NavTitle>
              </Box>
              <Box>
                <Flex flexWrap={`wrap`}>
                  {tab.navs.map(nav => {
                    const { href, name, internal = false } = nav

                    if (internal) {
                      return (
                        <Box key={`nav-${tab.name}-${name}`} py={1} width={1}>
                          <TransparentLink to={href}>
                            <NavTextInt
                              fontFamily={`Lato, Helvetica, Arial, sans-serif`}
                              fontSize={16}>
                              {name}
                            </NavTextInt>
                          </TransparentLink>
                        </Box>
                      )
                    } else {
                      return (
                        <NavLinkExt
                          href={href}
                          key={`nav-${tab.name}-${name}`}
                          fontSize={16}
                          py={1}
                          width={1}>
                          {name}
                        </NavLinkExt>
                      )
                    }
                  })}
                </Flex>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
      <Box pt={2} pb={5}>
        <NavText fontFamily='body'>
          © {new Date().getFullYear()} Phumrapee Limpianchop
        </NavText>
      </Box>
    </Box>
  )
}

export default memo(FooterComponent)
