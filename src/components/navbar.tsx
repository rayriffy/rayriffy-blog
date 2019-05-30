import _ from 'lodash'
import React from 'react'

import navbarStyle from './navbar.module.css'

interface PropsInterface {
  align: string
  keys: string
  tabs: {
    name: string
    href: string
    newtab: boolean
  }[]
}

const Navbar: React.SFC<PropsInterface> = props => {
  const {tabs, keys, align} = props

  const processedTabs: object[] = []
  _.each(tabs, tab => {
    if (tab.newtab === false) {
      processedTabs.push(
        <li key={`${keys}-${tab.name}`}>
          <a href={tab.href}>{tab.name}</a>
        </li>
      )
    } else {
      processedTabs.push(
        <li key={`${keys}-${tab.name}`}>
          <a href={tab.href} rel="noopener noreferrer" target="_blank">
            {tab.name}
          </a>
        </li>
      )
    }
  })

  return (
    <nav
      key={keys}
      className={[
        navbarStyle.navbar,
        align === 'left' ? navbarStyle.navbarleft : align === 'center' ? navbarStyle.navbarcenter : navbarStyle.navbarright,
      ].join(' ')}>
      <ul className={navbarStyle.nav}>{processedTabs}</ul>
    </nav>
  )
}

export {Navbar}
