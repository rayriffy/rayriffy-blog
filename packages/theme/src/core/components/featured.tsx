import React from 'react'

import Img from 'gatsby-image'

import TransparentLink from './transparentLink'

import { IFeaturedProps } from '../@types/IFeaturedProps'

const FeaturedComponent: React.FC<IFeaturedProps> = props => {
  const { slug, banner, featured, title, subtitle } = props

  const renderedCard = (
    <div className='core-featured'>
      <Img className='img' fluid={banner.localFile.childImageSharp.fluid} />
      <div className='container'>
        {featured ? <div className='feat'>FEATURED</div> : null}
        <div className='title'>{title}</div>
        {subtitle ? <div className='subtitle'>{subtitle}</div> : null}
      </div>
    </div>
  )

  return (
    <React.Fragment>
      {slug ? (
        <TransparentLink to={`${slug}`}>{renderedCard}</TransparentLink>
      ) : (
        renderedCard
      )}
    </React.Fragment>
  )
}

export default React.memo(FeaturedComponent)
