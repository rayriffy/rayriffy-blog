import React from 'react'

import { css, Global } from '@emotion/core'

const GlobalComponent: React.FC = () => {
  return (
    <Global
      styles={css`
        html {
          background-color: rgb(245, 245, 245);
        }

        body {
          margin: 0px;
          overflow: auto;
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
  )
}

export default GlobalComponent
