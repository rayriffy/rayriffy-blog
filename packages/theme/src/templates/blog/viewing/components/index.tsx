import React from 'react'

import { Helmet } from 'react-helmet-async'

import Card from '../../../../core/components/card'
import SEO from '../../../../core/components/seo'
import Ads from './ads'
import Nav from './nav'

import '../styles/global.styl'
import '../styles/index.styl'
import '../styles/onedark.styl'

import { IProps } from '../@types/IProps'

const BlogViewingComponent: React.FC<IProps> = props => {
  const { blog, node } = props.pageContext

  const { title, subtitle, banner, author, slug, date, content } = node

  const { GATSBY_ENV = 'production' } = process.env

  return (
    <React.Fragment>
      <Helmet title={title} />
      <SEO
        title={title}
        subtitle={subtitle}
        banner={banner.localFile.childImageSharp.fluid.src}
        author={author}
        slug={slug}
        date={date}
        type={`article`}
      />
      <div className='template-blog-viewing'>
        <div className='container'>
          <Card
            author={author}
            blog={{
              banner,
              date,
              title,
            }}
            type='post'>
            <div
              dangerouslySetInnerHTML={{
                __html: content.childMarkdownRemark.html,
              }}
            />
            {GATSBY_ENV === 'production' || GATSBY_ENV === 'staging' ? (
              <Ads />
            ) : null}
            <Nav {...blog} />
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BlogViewingComponent
