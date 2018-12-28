import React from 'react'
import PropTypes from 'prop-types'

import navigationStyle from './navigation.module.css'

class NavigationTemplate extends React.Component {
  render() {
    const {children} = this.props
    return <div className={navigationStyle.navpost}>{children}</div>
  }
}

export default NavigationTemplate

NavigationTemplate.propTypes = {
  children: PropTypes.array,
}
