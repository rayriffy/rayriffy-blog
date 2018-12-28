import React from 'react'
import PropTypes from 'prop-types'

import navigationContainerStyle from './navigation-container.module.css'

class NavigationContainerTemplate extends React.Component {
  render() {
    const {children} = this.props
    return <div className={navigationContainerStyle.container}>{children}</div>
  }
}

export default NavigationContainerTemplate

NavigationContainerTemplate.propTypes = {
  children: PropTypes.object,
}
