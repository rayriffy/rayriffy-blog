import React from 'react'

import TransparentLink from './transparentLink'

import '../styles/navbar.styl'

import { INavbarProps } from '../@types/INavbarProps'

const NavbarComponent: React.FC<INavbarProps> = props => {
  const { align, tabs } = props

  return (
    <div className={`core-navbar justify-${align}`}>
      {tabs.map(tab => {
        const { name, href, internal = false } = tab

        return (
          <div
            className='nav-slug'
            key={`navbar-${align}-${internal ? 'int' : 'ext'}-${name}`}>
            {internal ? (
              <TransparentLink to={href}>{name.toUpperCase()}</TransparentLink>
            ) : (
              <a href={href}>{name.toUpperCase()}</a>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(NavbarComponent)
