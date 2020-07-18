import React from 'react'
import ReactDOM from 'react-dom'

export const replaceHydrateFunction = () => {
  return (
    element: React.DOMElement<React.DOMAttributes<Element>, Element>,
    container: Element,
    callback: () => {}
  ) => {
    ReactDOM.render(element, container, callback)
  }
}
