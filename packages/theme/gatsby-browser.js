import React from 'react'

import App from './src/app/components'

export const onServiceWorkerUpdateReady = () => {
  window.location.reload()
}

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}
