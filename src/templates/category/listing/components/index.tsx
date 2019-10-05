import React from 'react'
import { Helmet } from 'react-helmet'

import { Box, Flex } from 'rebass'

import Card from '../../../../core/components/card'
import Chip from '../../../../core/components/chip'
import SEO from '../../../../core/components/seo'

import { IProps } from '../@types/IProps'

const CategoryListingComponent: React.FC<IProps> = props => {
  const {categories = []} = props.pageContext

  return (
    <Box>
      <Box mb={4}>
        <Helmet title={`Category`} />
        <SEO
          title='Category'
          author={{
            facebook: 'https://facebook.com/rayriffy',
            name: 'Phumrapee Limpianchop',
            twitter: '@rayriffy',
          }}
          type={`page`} />
        <Chip name="Category" desc="รวมประเภท Blog ไว้ให้ง่ายต่อการเข้าถึง" />
        <Flex justifyContent={`center`}>
          <Box width={[22/24, 22/24, 20/24, 18/24]}>
            <Flex flexWrap={`wrap`}>
              {categories.map(category => (
                <Box width={[1, 1, 1/2, 1/2]} p={3} key={`category-${category.key}`}>
                  <Card
                    slug={`/category/${category.key}`}
                    blog={{
                      banner: category.banner,
                      subtitle: category.desc,
                      title: category.name,
                    }}
                    type={`post`}
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default CategoryListingComponent
