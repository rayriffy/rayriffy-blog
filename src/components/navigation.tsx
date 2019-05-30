import React from 'react'

import navigationStyle from './navigation.module.css'

const Navigation: React.SFC = props => {
  const {children} = props

  return <div className={navigationStyle.navpost}>{children}</div>
}

export {Navigation}
