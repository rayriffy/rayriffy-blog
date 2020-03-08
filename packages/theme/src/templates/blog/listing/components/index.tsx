import React from 'react'

import Card from '../../../../core/components/card'
import Featured from '../../../../core/components/featured'
import Pagination from '../../../../core/components/pagination'
import SEO from '../../../../core/components/seo'

import '../styles/index.styl'

import { IProps } from '../@types/IProps'

const BlogListingComponent: React.FC<IProps> = props => {
  const { blogs, featured, page } = props.pageContext

  return (
    <React.Fragment>
      <SEO
        author={{
          facebook: 'https://facebook.com/rayriffy',
          name: 'Phumrapee Limpianchop',
          twitter: '@rayriffy',
        }}
        type='page'
      />
      <div className='template-blog-listing'>
        {featured !== null ? (
          <div className='feat'>
            <div className='container'>
              <Featured
                title={featured.node.title}
                subtitle={featured.node.subtitle}
                slug={
                  featured.node.slug.startsWith('/')
                    ? featured.node.slug
                    : `/${featured.node.slug}`
                }
                banner={featured.node.banner}
                featured={true}
              />
            </div>
          </div>
        ) : null}
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
                    author={author}
                    blog={meta}
                    slug={slug.startsWith('/') ? slug : `/${slug}`}
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
          pathPrefix='/'
        />
      </div>
    </React.Fragment>
  )
}

export default BlogListingComponent
