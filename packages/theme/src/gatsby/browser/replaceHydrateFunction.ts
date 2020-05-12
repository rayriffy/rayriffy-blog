import React from 'react'
import ReactDOM from 'react-dom'

import { GatsbyBrowser } from 'gatsby'

export const replaceHydrateFunction: GatsbyBrowser['replaceHydrateFunction'] = () => {
  return (
    element: React.DOMElement<React.DOMAttributes<Element>, Element>,
    container: Element,
    callback: () => {}
  ) => {
    ReactDOM.render(element, container, callback)
  }
}
