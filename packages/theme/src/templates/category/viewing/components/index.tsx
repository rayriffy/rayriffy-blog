import React from 'react'

import { Helmet } from 'react-helmet-async'

import Card from '../../../../core/components/card'
import Featured from '../../../../core/components/featured'
import Pagination from '../../../../core/components/pagination'
import SEO from '../../../../core/components/seo'

import '../styles/index.styl'

import { IProps } from '../@types/IProps'

const CategoryViewingComponent: React.FC<IProps> = props => {
  const { pathPrefix, blogs, category, page } = props.pageContext

  return (
    <React.Fragment>
      <Helmet title={category.name} />
      <SEO
        title={category.name}
        author={{
          facebook: 'https://facebook.com/rayriffy',
          name: 'Phumrapee Limpianchop',
          twitter: '@rayriffy',
        }}
        type='page'
      />
      <div className='template-category-viewing'>
        <div className='feat'>
          <div className='container'>
            <Featured
              title={category.name}
              subtitle={category.desc}
              banner={props.pageContext.banner}
              featured={false}
            />
          </div>
        </div>
        <div className='list'>
          <div className='container'>
            {blogs.map(blog => {
              const { author, title, subtitle, date, banner, slug } = blog.node

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
                    type='listing'
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

export default CategoryViewingComponent
