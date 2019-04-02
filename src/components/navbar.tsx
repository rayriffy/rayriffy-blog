import _ from 'lodash'
import React from 'react'

import navbarStyle from './navbar.module.css'

interface PropsInterface {
  align: string,
  keys: string,
  tabs: {
    name: string,
    href: string,
    newtab: boolean,
  }[],
}
export class Navbar extends React.Component<PropsInterface> {
  public render(): object {
    const tabs: object[] = []
    _.each(this.props.tabs, tab => {
      if (tab.newtab === false) {
        tabs.push(
          <li key={`${this.props.keys}-${tab.name}`}>
            <a href={tab.href}>{tab.name}</a>
          </li>,
        )
      } else {
        tabs.push(
          <li key={`${this.props.keys}-${tab.name}`}>
            <a href={tab.href} rel='noopener noreferrer' target='_blank'>
              {tab.name}
            </a>
          </li>,
        )
      }
    })

    return (
      <nav
        key={this.props.keys}
        className={[
          navbarStyle.navbar,
          this.props.align === 'left'
            ? navbarStyle.navbarleft
            : this.props.align === 'center'
            ? navbarStyle.navbarcenter
            : navbarStyle.navbarright,
        ].join(' ')}
      >
        <ul className={navbarStyle.nav}>{tabs}</ul>
      </nav>
    )
  }
}
