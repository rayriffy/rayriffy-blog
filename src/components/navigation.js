import React from 'react'
import { Link } from 'gatsby'

import navStyle from './navigation.module.css'

class Template extends React.Component {
  render() {
    return (
      <Link to={this.props.slug} rel={this.props.meta}>
        <span className={navStyle.meta}>{this.props.meta}</span>
        <span className={navStyle.title}>{this.props.title}</span>
      </Link>
    )
  }
}

export default Template
