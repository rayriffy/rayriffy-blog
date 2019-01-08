import React from 'react'
import PropTypes from 'prop-types'

import chipStyle from './chip.module.css'

export default class ChipTemplate extends React.Component {
  render() {
    return (
      <div className={chipStyle.container}>
        <h3 className={chipStyle.title}>{this.props.name}</h3>
        {this.props.desc && (
          <div className={chipStyle.subtitle}>{this.props.desc}</div>
        )}
      </div>
    )
  }
}

ChipTemplate.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
}
