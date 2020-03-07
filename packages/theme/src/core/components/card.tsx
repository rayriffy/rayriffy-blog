import React from 'react'

import dayjs from 'dayjs'
import Img from 'gatsby-image'

import TransparentLink from './transparentLink'

import { ICardProps } from '../@types/ICardProps'

const CardComponent: React.FC<ICardProps> = props => {
  const { author, blog, children, slug, type } = props
  const { title, subtitle, banner, date } = blog

  const cardBanner = banner ? (
    <Img fluid={banner.localFile.childImageSharp.fluid} />
  ) : null

  const cardTitle = <div className={`blog-title ${type}`}>{title}</div>

  return (
    <div className='core-card'>
      {banner ? (
        <React.Fragment>
          {slug ? (
            <TransparentLink to={slug} aria-label={`link-${title}`}>
              {cardBanner}
            </TransparentLink>
          ) : (
            cardBanner
          )}
        </React.Fragment>
      ) : null}
      <div className={`meta ${type}`}>
        {slug ? (
          <TransparentLink to={slug} aria-label={`link-${title}`}>
            {cardTitle}
          </TransparentLink>
        ) : (
          cardTitle
        )}
        {date && author ? (
          <div className='date-author'>
            Written by{' '}
            <TransparentLink
              to={'/author/' + author.user}
              aria-label={author.name}>
              {author.name}
            </TransparentLink>{' '}
            on {dayjs(date).format('DD MMMM YYYY')}
          </div>
        ) : null}
        {subtitle ? <div className='subtitle'>{subtitle}</div> : null}
      </div>
      <div className='card-children'>{children}</div>
    </div>
  )
}

export default React.memo(CardComponent)
