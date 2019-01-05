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
      <nav className={navbarStyle.navbar}>
        <ul className={navbarStyle.nav}>{tabs}</ul>
      </nav>
    )
  }
}

NavbarTemplate.propTypes = {
  tabs: PropTypes.array,
}
