import { Link } from 'gatsby'
import React from 'react'

import styled from 'styled-components'

import { Navbar } from './navbar'

const Container = styled.header`
  margin-bottom: 35px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 767px) {
    display: block;
    margin: 0 0 20px 0;
    padding-left: 25px;
    text-align: left;
  }
`

const Logo = styled.svg`
  height: 120px;
  margin-bottom: 1.45rem;

  @media (max-width: 767px) {
    margin-left: 15px;
    height: 60px;
  }
`

const Header: React.SFC = () => {
  return (
    <Container>
      <Link to={'/'} aria-label={`logo`}>
        <Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370.1 512">
          <path
            fill="#4b6fff"
            d="M320.61,295.5,447.15,512H329.39L208,303.54H180.18V512H77V0H251.12C365.23,0,425.94,54.13,425.94,145.55
            ,425.94,227.47,389.37,277.21,320.61,295.5ZM180.18,87V216.5h70.94c48.28,0,71.69-15.36,71.69-68
            ,0-36.57-23.41-61.44-71.69-61.44Z"
            transform="translate(-77.04)"
          />
        </Logo>
      </Link>
      <Navbar
        align="center"
        keys="navHeader"
        tabs={[
          {
            href: '/',
            name: 'Home',
            newtab: false,
          },
          {
            href: '/category',
            name: 'Category',
            newtab: false,
          },
          {
            href: 'https://l.rayriffy.com/nico',
            name: '♪',
            newtab: true,
          },
        ]}
      />
    </Container>
  )
}

export { Header }
