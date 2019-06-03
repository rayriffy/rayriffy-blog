import React from 'react'

import styled from 'styled-components'

import { Navbar } from './navbar'

const Wraper = styled.footer`
  margin-top: 35px;
`

const NavContainer = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;

  @media only screen and (min-width: 540px) {
    width: 80%;
  }
  
  @media only screen and (min-width: 960px) {
    width: 66.67%;
    max-width: 60rem;
  }
`

const FooterContainer = styled.div`
  text-align: center;
`

const Love = styled.img`
  height: 14px;
  width: auto;
  margin: 0 0 0 0;
`

const Footer: React.SFC = () => {
  const imgUrl = 'https://s.w.org/images/core/emoji/2.4/svg/2764.svg'
  const faceUrl = 'https://facebook.com/rayriffy'

  return (
    <Wraper>
      <NavContainer>
        <Navbar
          align="left"
          keys="navFooter"
          tabs={[
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
          ]}
        />
      </NavContainer>
      <FooterContainer>
        Built with <Love src={imgUrl} alt="love" /> by{' '}
        <a href={faceUrl} rel="noopener noreferrer" target="_blank">
          RayRiffy
        </a>
      </FooterContainer>
    </Wraper>
  )
}

export { Footer }
