import React from 'react'
import PropTypes from 'prop-types'

import navigationStyle from './navigation.module.css'

export default class NavigationTemplate extends React.Component {
  render() {
    const {children} = this.props
    return <div className={navigationStyle.navpost}>{children}</div>
  }
}

NavigationTemplate.propTypes = {
  children: PropTypes.array,
}
