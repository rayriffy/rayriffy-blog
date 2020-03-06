import React from 'react'

import styled from '@emotion/styled'
import { Box, Link, Text } from 'rebass'

import TransparentLink from '../../core/components/transparentLink'

import '../styles/footer.styl'

import { IFooterTab } from '../@types/IFooterTab'

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
    <div className='shell-footer'>
      <div className='logo-container'>
        <img className='logo' src='/icon.svg' />
      </div>
      <div className='tabstack-container'>
        {tabs.map(tab => (
          <div className='tab-container' key={`footer-tab-${tab.name}`}>
            <div className='tabtitle'>{tab.name.toUpperCase()}</div>
            <div className='link-container'>
              {tab.navs.map(nav => {
                const { href, name, internal = false } = nav
                if (internal) {
                  return (
                    <Box key={`nav-${tab.name}-${name}`} py={2} width={1}>
                      <TransparentLink to={href}>
                        <NavTextInt fontFamily='body' fontSize={16}>
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
                      py={2}
                      width={1}>
                      {name}
                    </NavLinkExt>
                  )
                }
              })}
            </div>
          </div>
        ))}
      </div>
      <div className='copyright'>
        © 2019 - {new Date().getFullYear()} Phumrapee Limpianchop
      </div>
    </div>
  )
}

export default React.memo(FooterComponent)
