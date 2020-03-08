import React from 'react'

import { Helmet } from 'react-helmet'

import Card from '../../../../core/components/card'
import Featured from '../../../../core/components/featured'
import Navbar from '../../../../core/components/navbar'
import Pagination from '../../../../core/components/pagination'
import SEO from '../../../../core/components/seo'

import '../styles/index.styl'

import { IProps } from '../@types/IProps'

const AuthorViewingComponent: React.FC<IProps> = props => {
  const { page, pathPrefix, author, blogs } = props.pageContext

  return (
    <React.Fragment>
      <Helmet title={author.name} />
      <SEO
        title={author.name}
        banner={author.banner.localFile.childImageSharp.fluid.src}
        author={{
          facebook: 'https://facebook.com/rayriffy',
          name: 'Phumrapee Limpianchop',
          twitter: '@rayriffy',
        }}
        type={`page`}
      />
      <div className='template-author-viewing'>
        <div className='feat'>
          <div className='container'>
            <Featured
              title={author.name}
              banner={author.banner}
              featured={false}
            />
          </div>
        </div>
        <div className='nav'>
          <Navbar
            align={`center`}
            tabs={[
              {
                href: author.facebook,
                internal: false,
                name: 'Facebook',
              },
              {
                href: 'https://twitter.com/' + author.twitter.split('@')[1],
                internal: false,
                name: 'Twitter',
              },
            ]}
          />
        </div>
        <div className='list'>
          <div className='container'>
            {blogs.map(blog => {
              const { title, subtitle, date, banner, slug } = blog.node

              const meta = {
                banner,
                date,
                subtitle,
                title,
              }

              return (
                <div className='item' key={`listing-${page.current}-${slug}`}>
                  <Card
                    slug={slug.startsWith('/') ? slug : `/${slug}`}
                    author={author}
                    blog={meta}
                    type={`listing`}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <Pagination
          numPages={page.max}
          currentPage={page.current}
          pathPrefix={pathPrefix}
        />
      </div>
    </React.Fragment>
  )
}

export default AuthorViewingComponent
