import React from 'react'
import { Link } from 'gatsby'

import cardStyle from './blog-card.module.css'

class Template extends React.Component {
  render() {
    const { children } = this.props
    let banner,title 
    if (this.props.link === true) {
      banner = (
        <Link to={this.props.slug}><img src={this.props.banner} /></Link>
      )
      title = (
        <Link style={{ textDecoration: 'none', color: '#000000', boxShadow: 'none' }} to={this.props.slug}>
          {this.props.title}
        </Link>
      )
    }
    else {
      banner = (
        <img src={this.props.banner} alt='banner' />
      )
      title = (
        this.props.title
      )
    }
    return (
      <div key={this.props.slug} className={[cardStyle.card]}>
        <div className={[cardStyle.teaser, cardStyle.displayblock].join(' ')}>
          {banner}
        </div>
        <div className={cardStyle.content}>
          <h1 className={cardStyle.title}>
            {title}
          </h1>
          <div className={cardStyle.meta}>
            Written by Phumrapee Limpianchop on {this.props.date}
          </div>
          {
            this.props.subtitle &&
            <p className={cardStyle.subtitle}>{this.props.subtitle}</p>
          }
        </div>
        {children}
      </div>
    )
  }
}

export default Template
