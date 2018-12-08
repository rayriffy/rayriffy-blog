import React from 'react'

import footerStyle from './footer.module.css'

class Template extends React.Component {
  render() {
    const imgUrl = 'https://s.w.org/images/core/emoji/2.4/svg/2764.svg'
    const faceUrl = 'https://facebook.com/rayriffy'
    return (
      <div className={footerStyle.footer}>
        <center>
          This site built with <img src={imgUrl} className={footerStyle.image} alt='love' /> by <a href={faceUrl} target="_blank">RayRiffy</a>
        </center>
      </div>
    )
  }
}

export default Template
