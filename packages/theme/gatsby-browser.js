import React from 'react'
import ReactDOM from 'react-dom'

import App from './src/app/components'
import { Context } from './src/store/context'

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}

export const wrapRootElement = ({ element }) => {
  return (
    <Context>
      {element}
    </Context>
  )
}

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback)
  }
}
