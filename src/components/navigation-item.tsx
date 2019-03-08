import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'

import navigationItemStyle from './navigation-item.module.css'

export default class NavigationItemTemplate extends React.Component {
  render() {
    return (
      <Link to={this.props.slug} rel={this.props.meta}>
        <span className={navigationItemStyle.meta}>{this.props.meta}</span>
        <span className={navigationItemStyle.title}>{this.props.title}</span>
      </Link>
    )
  }
}

NavigationItemTemplate.propTypes = {
  meta: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
}
