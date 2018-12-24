import React from 'react'
import PropTypes from 'prop-types'

import navigationContainerStyle from './navigation-container.module.css'

class Template extends React.Component {
  render() {
    const {children} = this.props
    return <div className={navigationContainerStyle.container}>{children}</div>
  }
}

export default Template

Template.propTypes = {
  children: PropTypes.object,
}
