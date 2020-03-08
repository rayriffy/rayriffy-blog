import React from 'react'

import { Helmet } from 'react-helmet'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

import Card from '../../../../core/components/card'
import Chip from '../../../../core/components/chip'
import SEO from '../../../../core/components/seo'

import '../styles/index.styl'

import { IProps } from '../@types/IProps'

const AuthorListingComponent: React.FC<IProps> = props => {
  const { authors = [] } = props.pageContext

  return (
    <React.Fragment>
      <Helmet title='Authors' />
      <SEO
        title='Authors'
        author={{
          facebook: 'https://facebook.com/rayriffy',
          name: 'Phumrapee Limpianchop',
          twitter: '@rayriffy',
        }}
        type='page'
      />
      <Chip name='Authors' />
      <div className='template-author-listing'>
        <div className='container'>
          {authors.map(author => (
            <div className='item' key={`author-${author.user}`}>
              <Card
                slug={`/author/${author.user}`}
                blog={{
                  banner: author.banner,
                  title: author.name,
                }}
                type='listing'>
                <FaFacebook />{' '}
                <a
                  href={author.facebook}
                  rel='noopener noreferrer'
                  target='_blank'>
                  {author.facebook.split('/')[3]}
                </a>
                <br />
                <FaTwitter />{' '}
                <a
                  href={'https://twitter.com/' + author.twitter.split('@')[1]}
                  rel='noopener noreferrer'
                  target='_blank'>
                  {author.twitter}
                </a>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default AuthorListingComponent
