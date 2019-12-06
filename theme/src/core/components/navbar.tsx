import React, { memo } from 'react'

import styled from '@emotion/styled'
import { Box, Flex, Link, Text } from 'rebass'

import TransparentLink from './transparentLink'

import { INavbarProps } from '../@types/INavbarProps'

const NavLink = styled(Link)`
  text-decoration: none;
`

const NavText = styled(Text)`
  color: rgb(34, 34, 34);

  @media (prefers-color-scheme: dark) {
    color: rgb(255, 255, 255);
  }
`

const NavbarComponent: React.FC<INavbarProps> = props => {
  const { align, tabs } = props

  return (
    <Flex justifyContent={align}>
      {tabs.map(tab => {
        const { name, href, internal = false } = tab

        if (internal) {
          return (
            <Box px={3} key={`navbar-${align}-int-${name}`}>
              <TransparentLink to={href}>
                <NavText
                  fontFamily={`Lato, Helvetica, Arial, sans-serif`}
                  fontSize={13}>
                  {name.toUpperCase()}
                </NavText>
              </TransparentLink>
            </Box>
          )
        } else {
          return (
            <NavLink px={3} href={href} key={`navbar-${align}-ext-${name}`}>
              <NavText
                fontFamily={`Lato, Helvetica, Arial, sans-serif`}
                fontSize={13}>
                {name.toUpperCase()}
              </NavText>
            </NavLink>
          )
        }
      })}
    </Flex>
  )
}

export default memo(NavbarComponent)
