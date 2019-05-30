import { Link } from 'gatsby'
import React from 'react'

import Img, { FluidObject } from 'gatsby-image'

import cardStyle from './card.module.css'

interface PropsInterface {
  author?: {
    user: string
    name: string
    facebook: string
    twitter?: string
  }
  banner: FluidObject
  date?: string
  featured?: boolean
  link: boolean
  slug: string
  subtitle?: string
  title: string
  content?: string
}

const Card: React.SFC<PropsInterface> = props => {
  const {author, banner, date, featured, link, slug, subtitle, title, content, children} = props

  const processedBanner =
    link === true ? (
      <Link to={slug} aria-label={`card-banner-link-${slug}`}>
        <Img fluid={banner} className={cardStyle.banner} />
      </Link>
    ) : (
      <Img fluid={banner} className={cardStyle.banner} />
    )

  const processedTitle =
    link === true ? (
      <Link to={slug} aria-label={`card-title-link-${slug}`}>
        {title}
      </Link>
    ) : (
      title
    )

  return (
    <div key={slug} className={cardStyle.card}>
      <div className={[cardStyle.teaser, cardStyle.displayblock].join(' ')}>
        {featured && <span className={cardStyle.slug}>featured</span>}
        {processedBanner}
      </div>
      <div className={cardStyle.header}>
        <h1 className={cardStyle.title}>{processedTitle}</h1>
        {date && author && (
          <div className={cardStyle.meta}>
            Written by <Link to={'/author/' + author.user}>{author.name}</Link> on {date}
          </div>
        )}
        {subtitle && <p className={cardStyle.subtitle}>{subtitle}</p>}
      </div>
      {content && <div className={cardStyle.content} dangerouslySetInnerHTML={{__html: content}} />}
      {children}
    </div>
  )
}

export { Card }
