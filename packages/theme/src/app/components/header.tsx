import React, { memo } from 'react'

import Navbar from '../../core/components/navbar'
import TransparentLinkComponent from '../../core/components/transparentLink'

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
          <TransparentLinkComponent to={`/`} aria-label={`logo`}>
            <img className='header-logo' src='/icon.svg' />
          </TransparentLinkComponent>
        </div>
      </div>
      <Navbar align={`center`} tabs={navTabs} />
    </div>
  )
}

export default memo(HeaderComponent)
