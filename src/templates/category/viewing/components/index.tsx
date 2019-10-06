import React from 'react'
import { Helmet } from 'react-helmet'

import { graphql } from 'gatsby'

import { Box, Flex } from 'rebass'

import Card from '../../../../core/components/card'
import Featured from '../../../../core/components/featured'
import Pagination from '../../../../core/components/pagination'
import SEO from '../../../../core/components/seo'

import { getAuthor } from '../../../../core/services/getAuthor'

import { IProps } from '../@types/IProps'

const CategoryViewingComponent: React.FC<IProps> = props => {
  const authors = props.data.allAuthorsJson.edges
  const posts = props.data.allMarkdownRemark.edges
  const categoryName = props.data.categoriesJson.name
  const categoryDescription = props.data.categoriesJson.desc

  const {currentPage, numPages, pathPrefix, banner} = props.pageContext

  return (
    <Box>
      <Helmet title={categoryName} />
      <SEO
        title={categoryName}
        author={{
          facebook: 'https://facebook.com/rayriffy',
          name: 'Phumrapee Limpianchop',
          twitter: '@rayriffy',
        }}
        type={`page`} />
      <Box my={4}>
        <Flex justifyContent={`center`}>
          <Box width={[1, 18/24, 16/24, 14/24]}>
            <Featured
              title={categoryName}
              subtitle={categoryDescription}
              banner={banner.node.frontmatter.banner}
              featured={false}
            />
          </Box>
        </Flex>
      </Box>
      <Box>
        <Flex justifyContent={`center`}>
          <Box width={[22/24, 22/24, 20/24, 18/24]}>
            <Flex flexWrap={`wrap`}>
              {posts.map(post => {
                const {fields, frontmatter} = post.node
                const {slug} = fields
                const {author} = frontmatter

                const fetchedAuthor = getAuthor(authors, author)

                return (
                  <Box width={[1, 1, 1/2, 1/2]} p={3} key={`listing-${currentPage}-${slug}`}>
                    <Card key={slug} slug={slug} author={fetchedAuthor.node} blog={frontmatter} type={`listing`} />
                  </Box>
                )
              })}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Pagination numPages={numPages} currentPage={currentPage} pathPrefix={pathPrefix} />
    </Box>
  )
}

export default CategoryViewingComponent
