import React from 'react'

import navbarStyle from './navbar.module.css'

class NavbarTemplate extends React.Component {
  render() {
    return (
      <nav className={navbarStyle.navbar}>
        <ul className={navbarStyle.nav}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/category">Category</a>
          </li>
          <li>
            <a
              href="https://l.rayriffy.com/nico"
              rel="noopener noreferrer"
              target="_blank">
              ♪
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavbarTemplate
