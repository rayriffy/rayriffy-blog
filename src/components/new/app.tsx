import React from 'react'
import Helmet from 'react-helmet'

import { graphql, StaticQuery } from 'gatsby'

import { createGlobalStyle } from 'styled-components'

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
    background-color: #f5f5f5;
  }
  a {
    text-decoration: none;
    color: rgb(83, 106, 144);
  }
`

const HelmetRenderer = (data: IData) => {
  const { title } = data.site.siteMetadata
  return (
    <Helmet htmlAttributes={{lang: 'en'}} titleTemplate={`${title} · %s`} defaultTitle={title} />
  )
}

const App: React.SFC = props => {
  const {children} = props

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
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default App
