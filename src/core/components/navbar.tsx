import React from 'react'

import { Flex, Link, Text } from 'rebass'
import styled from 'styled-components'

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
        const {name, href} = tab

        return (
          <NavLink px={3} href={href} key={`navbar-${align}-${name}`}>
            <NavText fontFamily={`Lato, Helvetica, Arial, sans-serif`} fontSize={13}>{name.toUpperCase()}</NavText>
          </NavLink>
        )
      })}
    </Flex>
  )
}

export default NavbarComponent
