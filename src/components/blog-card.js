import React from 'react'
import { Link } from 'gatsby'

import Img from 'gatsby-image'

import cardStyle from './blog-card.module.css'

class Template extends React.Component {
  render() {
    const { children } = this.props
    let banner, title
    if (this.props.link === true) {
      banner = (
        <Link to={this.props.slug}>
          <Img
            fluid={this.props.banner}
            className={cardStyle.banner}
          />
        </Link>
      )
      title = (
        <Link style={{ textDecoration: 'none', color: '#000000', boxShadow: 'none' }} to={this.props.slug}>
          {this.props.title}
        </Link>
      )
    }
    else {
      banner = (
        <Img
          fluid={this.props.banner}
          className={cardStyle.banner}
        />
      )
      title = (
        this.props.title
      )
    }
    return (
      <div key={this.props.slug} className={[cardStyle.card]}>
        <div className={[cardStyle.teaser, cardStyle.displayblock].join(' ')}>
          {
            this.props.featured &&
            <span className={cardStyle.slug}>featured</span>
          }
          {
            this.props.status !== 'published' &&
            <span className={cardStyle.slug}>{this.props.status}</span>
          }
          {banner}
        </div>
        <div className={cardStyle.content}>
          <h1 className={cardStyle.title}>
            {title}
          </h1>
          {
            (this.props.date && this.props.author) &&
            <div className={cardStyle.meta}>
              Written by <a href={this.props.author.facebook} target="_blank">{this.props.author.name}</a> on {this.props.date}
            </div>
          }
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
