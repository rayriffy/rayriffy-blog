import React from 'react'
import { Link } from 'gatsby'

import navitemStyle from './navigation-item.module.css'

class Template extends React.Component {
  render() {
    return (
      <Link to={this.props.slug} rel={this.props.meta}>
        <span className={navitemStyle.meta}>{this.props.meta}</span>
        <span className={navitemStyle.title}>{this.props.title}</span>
      </Link>
    )
  }
}

export default Template
