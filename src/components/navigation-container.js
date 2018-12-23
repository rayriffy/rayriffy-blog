import React from 'react'
import PropTypes from 'prop-types'

import navcontainerStyle from './navigation-container.module.css'

class Template extends React.Component {
  render() {
    const {children} = this.props
    return <div className={navcontainerStyle.container}>{children}</div>
  }
}

export default Template

Template.propTypes = {
  children: PropTypes.object,
}
