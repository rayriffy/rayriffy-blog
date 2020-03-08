import React from 'react'
import ReactDOM from 'react-dom'

import App from './src/app/components'

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback)
  }
}
