import React from 'react'

import { Helmet } from 'react-helmet'

import Card from '../../../../core/components/card'
import Chip from '../../../../core/components/chip'
import SEO from '../../../../core/components/seo'

import '../styles/index.styl'

import { IProps } from '../@types/IProps'

const CategoryListingComponent: React.FC<IProps> = props => {
  const { categories = [] } = props.pageContext

  return (
    <React.Fragment>
      <Helmet title='Category' />
      <SEO
        title='Category'
        author={{
          facebook: 'https://facebook.com/rayriffy',
          name: 'Phumrapee Limpianchop',
          twitter: '@rayriffy',
        }}
        type='page'
      />
      <Chip name='Category' desc='รวมประเภท Blog ไว้ให้ง่ายต่อการเข้าถึง' />
      <div className='template-category-listing'>
        <div className='container'>
          {categories.map(category => (
            <div className='item' key={`category-${category.key}`}>
              <Card
                slug={`/category/${category.key}`}
                blog={{
                  banner: category.banner,
                  subtitle: category.desc,
                  title: category.name,
                }}
                type='post'
              />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default CategoryListingComponent
