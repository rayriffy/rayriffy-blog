import React from 'react'

import styled, { createGlobalStyle } from 'styled-components'

import { Dev } from './dev'
import { Footer } from './footer'
import { Header } from './header'

interface PropsInterface {
  location?: object
}

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #f5f5f5;
  }
`

const Page = styled.div`
  background-color: #f5f5f5;
`

const Cover = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;

  @media (min-width: 768px) {
    & {
      padding-top: 50px;
      padding-bottom: 50px;
    }
  }

  @media only screen and (min-width: 960px) {
    padding-top: 70px;
    padding-bottom: 70px;
  }
`

const Container = styled.main`
  width: 90%;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (min-width: 540px) {
    width: 80%;
  }

  @media only screen and (min-width: 960px) {
    width: 66.67%;
    max-width: 60rem;
  }
`

const Layout: React.SFC<PropsInterface> = props => {
  const {children} = props

  let devStrip: object | null = null

  const {GATSBY_ENV = 'development'} = process.env

  if (GATSBY_ENV !== 'production') {
    devStrip = <Dev />
  }

  return (
    <Page>
      <GlobalStyle />
      {devStrip}
      <Cover>
        <Header />
        <Container>{children}</Container>
        <Footer />
      </Cover>
    </Page>
  )
}

export { Layout }
