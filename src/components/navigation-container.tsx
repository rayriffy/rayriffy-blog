import React from 'react'

import navigationContainerStyle from './navigation-container.module.css'

export default class NavigationContainerTemplate extends React.Component {
  render() {
    const {children} = this.props
    return <div className={navigationContainerStyle.container}>{children}</div>
  }
}
