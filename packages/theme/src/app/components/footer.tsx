import React from 'react'

import Logo from '../../core/components/logo'
import TransparentLink from '../../core/components/transparentLink'

import '../styles/footer.styl'

import { footerTabs } from '../constants/footerTabs'

const FooterComponent: React.FC = () => {
  return (
    <div className='shell-footer'>
      <div className='logo-container'>
        <Logo className='logo' />
      </div>
      <div className='tabstack-container'>
        {footerTabs.map(tab => (
          <div className='tab-container' key={`footer-tab-${tab.name}`}>
            <div className='tabtitle'>{tab.name.toUpperCase()}</div>
            <div className='link-container'>
              {tab.navs.map(nav => {
                const { href, name, internal = false } = nav

                return (
                  <div className='link' key={`nav-${tab.name}-${name}`}>
                    {internal ? (
                      <TransparentLink to={href}>{name}</TransparentLink>
                    ) : (
                      <a href={href}>{name}</a>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div className='copyright'>
        © 2019 - {new Date().getFullYear()} Phumrapee Limpianchop
      </div>
    </div>
  )
}

export default React.memo(FooterComponent)
