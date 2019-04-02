import React from 'react'
import {Link} from 'gatsby'

import navigationItemStyle from './navigation-item.module.css'

interface PropsInterface {
  meta: string;
  slug: string;
  title: string;
}
export default class NavigationItemTemplate extends React.Component<PropsInterface> {
  render() {
    return (
      <Link to={this.props.slug} rel={this.props.meta}>
        <span className={navigationItemStyle.meta}>{this.props.meta}</span>
        <span className={navigationItemStyle.title}>{this.props.title}</span>
      </Link>
    )
  }
}
