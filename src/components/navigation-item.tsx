import {Link} from 'gatsby'
import React from 'react'

import navigationItemStyle from './navigation-item.module.css'

interface PropsInterface {
  meta: string,
  slug: string,
  title: string,
}

const NavigationItem: React.SFC<PropsInterface> = props => {
  const {slug, meta, title} = props
  return (
    <Link to={slug} rel={meta}>
      <span className={navigationItemStyle.meta}>{meta}</span>
      <span className={navigationItemStyle.title}>{title}</span>
    </Link>
  )
}

export {NavigationItem}
