import React from 'react'
import ReactDOM from 'react-dom'

import App from './src/app/components'

export const onServiceWorkerUpdateReady = () => {
  window.location.reload()
}

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    ReactDOM.createRoot(container, {
      hydrate: true,
      hydrationOptions: { onHydrated: callback },
    }).render(element)
  }
}

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}
