import React from 'react'

import navigationStyle from './navigation.module.css'

export default class NavigationTemplate extends React.Component {
  render() {
    const {children} = this.props
    return <div className={navigationStyle.navpost}>{children}</div>
  }
}
