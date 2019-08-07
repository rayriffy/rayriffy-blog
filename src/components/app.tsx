import React from 'react'
import Helmet from 'react-helmet'

import { graphql, StaticQuery } from 'gatsby'

import { createGlobalStyle } from 'styled-components'

import Dev from './dev'
import Footer from './footer'
import Header from './header'

interface IData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const GlobalStyle = createGlobalStyle`
  html {
    background-color: rgb(245, 245, 245);
  }
  a {
    text-decoration: none;
    color: rgb(83, 106, 144);
  }

  @media (prefers-color-scheme: dark) {
    html {
      background-color: rgb(40, 40, 40);
    }
    a {
      color: rgb(21, 142, 255);
    }
  }
`

const HelmetRenderer = (data: IData) => {
  const { title } = data.site.siteMetadata
  return (
    <Helmet htmlAttributes={{lang: 'en'}} titleTemplate={`${title} · %s`} defaultTitle={title} />
  )
}

const Component: React.FC = props => {
  const {children} = props
  const {GATSBY_ENV = 'production'} = process.env

  return (
    <>
    <StaticQuery
      query={graphql`
        query AppQuery {
          site {
            siteMetadata {
              title
            }
          }
        }        
      `}
      render={HelmetRenderer}
      />
      <GlobalStyle />
      {GATSBY_ENV !== 'production' ? <Dev /> : null}
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Component
