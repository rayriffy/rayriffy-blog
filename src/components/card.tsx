import {Link} from 'gatsby'
import React from 'react'

import Img, {FluidObject} from 'gatsby-image'

import cardStyle from './card.module.css'

interface PropsInterface {
  author?: {
    user: string,
    name: string,
    facebook: string,
    twitter?: string,
  },
  banner: FluidObject,
  date?: string,
  featured?: boolean,
  link: boolean,
  slug: string,
  status?: string,
  subtitle?: string,
  title: string,
  content?: string,
}

export class Card extends React.Component<PropsInterface> {
  public render(): object {
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
          to={this.props.slug}
        >
          {this.props.title}
        </Link>
      )
    } else {
      banner = <Img fluid={this.props.banner} className={cardStyle.banner} />
      title = this.props.title
    }

    return (
      <div key={this.props.slug} className={cardStyle.card}>
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
              <Link to={'/author/' + this.props.author.user}>
                {this.props.author.name}
              </Link>{' '}
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
