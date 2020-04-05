import React from 'react'

import { HelmetProvider } from 'react-helmet-async'

export const Context: React.FC = props => {
  const { children } = props

  return <HelmetProvider>{children}</HelmetProvider>
}
