import React from 'react'

import { GatsbyBrowser } from 'gatsby'

import { Context } from '../../store/context'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return (
    <React.StrictMode>
      <Context>{element}</Context>
    </React.StrictMode>
  )
}
