import React from 'react'
import { Link } from 'gatsby'


import Dev from './dev'
import Footer from './footer'
import layoutStyle from './layout.module.css'

class Template extends React.Component {
  render() {
    let devstrip = ''
    if(process.env.GATSBY_ENV !== 'production') {
      devstrip = (
        <Dev />
      )
    }
    const { children } = this.props
    return (
      <div className={layoutStyle.page}>
        {devstrip}
        <div className={layoutStyle.cover}>
          <div className={[layoutStyle.container]}>
            <div className={[layoutStyle.header]}>
              <Link to={'/'}>
                <img src="/header.png" />
              </Link>
            </div>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Template