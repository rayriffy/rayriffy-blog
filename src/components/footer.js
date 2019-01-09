import React from 'react'

import Navbar from './navbar'

import footerStyle from './footer.module.css'

export default class FooterTemplate extends React.Component {
  render() {
    const imgUrl = 'https://s.w.org/images/core/emoji/2.4/svg/2764.svg'
    const faceUrl = 'https://facebook.com/rayriffy'
    return (
      <div className={footerStyle.footer}>
        <div className={footerStyle.container}>
          <Navbar
            align="left"
            keys="navFooter"
            tabs={[
              {
                name: 'Home',
                href: '/',
                newtab: false,
              },
              {
                name: 'Authors',
                href: '/author',
                newtab: false,
              },
              {
                name: 'About Me',
                href: 'https://cv.rayriffy.com',
                newtab: true,
              },
              {
                name: 'Contact',
                href: 'mailto:contact@rayriffy.com',
                newtab: false,
              },
            ]}
          />
        </div>
        <center>
          This site built with{' '}
          <img src={imgUrl} className={footerStyle.image} alt="love" /> by{' '}
          <a href={faceUrl} rel="noopener noreferrer" target="_blank">
            RayRiffy
          </a>
        </center>
      </div>
    )
  }
}
