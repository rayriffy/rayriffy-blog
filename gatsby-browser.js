import React from 'react'

import {Layout} from './src/components/layout'

export const onServiceWorkerUpdateReady = () => {
  window.location.reload()
}

export const wrapPageElement = ({element, props}) => {
  return <Layout {...props}>{element}</Layout>
}
