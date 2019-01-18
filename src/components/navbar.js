import React from 'react'
import PropTypes from 'prop-types'

import navbarStyle from './navbar.module.css'

export default class NavbarTemplate extends React.Component {
  render() {
    const tabs = []
    this.props.tabs.forEach(tab => {
      if (tab.newtab === false) {
        tabs.push(
          <li>
            <a href={tab.href}>{tab.name}</a>
          </li>,
        )
      } else {
        tabs.push(
          <li>
            <a href={tab.href} rel="noopener noreferrer" target="_blank">
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
        ].join(' ')}>
        <ul className={navbarStyle.nav}>{tabs}</ul>
      </nav>
    )
  }
}

NavbarTemplate.propTypes = {
  align: PropTypes.string,
  keys: PropTypes.string,
  tabs: PropTypes.array,
}
