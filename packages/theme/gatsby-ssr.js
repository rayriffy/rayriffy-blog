import React from 'react'

import { ThemeProvider } from 'emotion-theming'
import { theme } from './src/utils/theme'

import App from './src/app/components'

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>
}
