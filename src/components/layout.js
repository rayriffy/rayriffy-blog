import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'

import Dev from './dev'
import Footer from './footer'
import Navbar from './navbar'

import layoutStyle from './layout.module.css'

class LayoutTemplate extends React.Component {
  render() {
    let devstrip = ''
    if (process.env.GATSBY_ENV !== 'production') {
      devstrip = <Dev />
    }
    const {children} = this.props
    return (
      <div className={layoutStyle.page}>
        {devstrip}
        <div className={layoutStyle.cover}>
          <div className={[layoutStyle.container]}>
            <div className={[layoutStyle.header]}>
              <Link to={'/'}>
                <img
                  className={layoutStyle.logo}
                  alt="logo"
                  src="/header.png"
                />
              </Link>
              <Navbar />
            </div>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default LayoutTemplate

LayoutTemplate.propTypes = {
  children: PropTypes.array,
}
