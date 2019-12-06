import React from 'react'

import { css, Global } from '@emotion/core'
import { Box } from 'rebass'

import Dev from './dev'
import Footer from './footer'
import Header from './header'
import Helmet from './helmet'

const Component: React.FC = props => {
  const { children } = props
  const { GATSBY_ENV = 'production' } = process.env

  return (
    <Box>
      <Helmet />
      <Global
        styles={css`
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
        `}
      />
      {GATSBY_ENV !== 'production' ? <Dev /> : null}
      <Header />
      {children}
      <Footer />
    </Box>
  )
}

export default Component
