import React, { ReactNode } from 'react'

import { Flex, Link, Text } from 'rebass'
import styled from 'styled-components'

const NavLink = styled(Link)`
  text-decoration: none;
`

interface IProps {
  align: string
  children?: ReactNode
  tabs: {
    name: string
    href: string
  }[]
}

const Navbar: React.SFC<IProps> = props => {
  const { align, tabs } = props
  return (
    <Flex justifyContent={align}>
      {tabs.map(tab => {
        const {name, href} = tab

        return (
          <NavLink px={3} href={href} key={`navbar-${align}-${name}`}>
            <Text color={`rgba(34, 34, 34, 1)`} fontFamily={`Lato, Helvetica, Arial, sans-serif`} fontSize={13}>{name.toUpperCase()}</Text>
          </NavLink>
        )
      })}
    </Flex>
  )
}

export default Navbar
