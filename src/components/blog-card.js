import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'

import Img from 'gatsby-image'

import cardStyle from './blog-card.module.css'

class BlogCardTemplate extends React.Component {
  render() {
    const {children} = this.props
    let banner, title
    if (this.props.link === true) {
      banner = (
        <Link to={this.props.slug}>
          <Img fluid={this.props.banner} className={cardStyle.banner} />
        </Link>
      )
      title = (
        <Link
          style={{textDecoration: 'none', color: '#000000', boxShadow: 'none'}}
          to={this.props.slug}>
          {this.props.title}
        </Link>
      )
    } else {
      banner = <Img fluid={this.props.banner} className={cardStyle.banner} />
      title = this.props.title
    }
    return (
      <div key={this.props.slug} className={[cardStyle.card]}>
        <div className={[cardStyle.teaser, cardStyle.displayblock].join(' ')}>
          {this.props.featured && (
            <span className={cardStyle.slug}>featured</span>
          )}
          {this.props.status !== 'published' && (
            <span className={cardStyle.slug}>{this.props.status}</span>
          )}
          {banner}
        </div>
        <div className={cardStyle.header}>
          <h1 className={cardStyle.title}>{title}</h1>
          {this.props.date && this.props.author && (
            <div className={cardStyle.meta}>
              Written by{' '}
              <a
                href={this.props.author.facebook}
                rel="noopener noreferrer"
                target="_blank">
                {this.props.author.name}
              </a>{' '}
              on {this.props.date}
            </div>
          )}
          {this.props.subtitle && (
            <p className={cardStyle.subtitle}>{this.props.subtitle}</p>
          )}
        </div>
        {this.props.content && (
          <div
            className={cardStyle.content}
            dangerouslySetInnerHTML={{__html: this.props.content}}
          />
        )}
        {children}
      </div>
    )
  }
}

export default BlogCardTemplate

BlogCardTemplate.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
  }),
  banner: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  date: PropTypes.string,
  featured: PropTypes.bool,
  link: PropTypes.bool,
  slug: PropTypes.string,
  status: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
}
