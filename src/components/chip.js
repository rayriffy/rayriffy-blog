import React from 'react'
import PropTypes from 'prop-types'

import chipStyle from './chip.module.css'

class ChipTemplate extends React.Component {
  render() {
    return (
      <div className={chipStyle.container}>
        <h3 className={chipStyle.title}>{this.props.name}</h3>
        <div className={chipStyle.subtitle}>{this.props.desc}</div>
      </div>
    )
  }
}

export default ChipTemplate

ChipTemplate.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
}
