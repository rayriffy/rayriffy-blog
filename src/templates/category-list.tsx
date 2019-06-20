import React from 'react'
import Helmet from 'react-helmet'

import { FluidObject } from 'gatsby-image'

import { Box, Flex } from 'rebass'

import Card from '../components/card'
import Chip from '../components/chip'

interface PropsInterface {
  location: object
  pageContext: {
    categories: {
      key: string
      name: string
      desc: string
      banner: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }[]
  }
}

const CategoryList: React.SFC<PropsInterface> = props => {
  const {categories = []} = props.pageContext

  return (
    <Box mb={4}>
      <Helmet title={`Category`} />
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
  )
}

export default CategoryList
