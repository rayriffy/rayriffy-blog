import React from 'react'

import navigationStyle from './navigation.module.css'

export class Navigation extends React.Component {
  render(): object {
    const {children} = this.props
    return <div className={navigationStyle.navpost}>{children}</div>
  }
}
