import React from 'react'

import App from './src/components/app'

export const onServiceWorkerUpdateReady = () => {
  window.location.reload()
}

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}
