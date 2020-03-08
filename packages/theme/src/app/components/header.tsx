import React, { memo } from 'react'

import Logo from '../../core/components/logo'
import Navbar from '../../core/components/navbar'
import TransparentLink from '../../core/components/transparentLink'

import '../styles/header.styl'

const HeaderComponent: React.FC = () => {
  const navTabs = [
    {
      href: '/',
      internal: true,
      name: 'home',
    },
    {
      href: '/category',
      internal: true,
      name: 'category',
    },
    {
      href: 'https://l.rayriffy.com/nico',
      internal: false,
      name: '♪',
    },
  ]

  return (
    <div className='shell-header'>
      <div className='flex'>
        <div className='container'>
          <TransparentLink to={`/`} aria-label={`logo`}>
            <Logo className='header-logo' />
          </TransparentLink>
        </div>
      </div>
      <Navbar align={`center`} tabs={navTabs} />
    </div>
  )
}

export default memo(HeaderComponent)
