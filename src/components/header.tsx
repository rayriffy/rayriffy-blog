import {Link} from 'gatsby'
import React from 'react'

import {Navbar} from './navbar'

import headerStyle from './header.module.css'

export class Header extends React.Component {
  public render() {
    return (
      <div className={headerStyle.container}>
        <Link to={'/'} aria-label={`logo`}>
          <svg className={headerStyle.logo} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 370.1 512'>
            <path
              fill='#4b6fff'
              d='M320.61,295.5,447.15,512H329.39L208,303.54H180.18V512H77V0H251.12C365.23,0,425.94,54.13,425.94,145.55
              ,425.94,227.47,389.37,277.21,320.61,295.5ZM180.18,87V216.5h70.94c48.28,0,71.69-15.36,71.69-68
              ,0-36.57-23.41-61.44-71.69-61.44Z'
              transform='translate(-77.04)'
            />
          </svg>
        </Link>
        <Navbar
          align='center'
          keys='navHeader'
          tabs={[
            {
              href: '/',
              name: 'Home',
              newtab: false,
            },
            {
              href: '/category',
              name: 'Category',
              newtab: false,
            },
            {
              href: 'https://l.rayriffy.com/nico',
              name: '♪',
              newtab: true,
            },
          ]}
        />
      </div>
    )
  }
}
