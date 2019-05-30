import React from 'react'

import navigationContainerStyle from './navigation-container.module.css'

const NavigationContainer: React.SFC = props => {
  const {children} = props

  return <div className={navigationContainerStyle.container}>{children}</div>
}

export { NavigationContainer }
