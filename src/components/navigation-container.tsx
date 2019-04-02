import React from 'react'

import navigationContainerStyle from './navigation-container.module.css'

export class NavigationContainer extends React.Component {
  render(): object {
    const {children} = this.props
    return <div className={navigationContainerStyle.container}>{children}</div>
  }
}
