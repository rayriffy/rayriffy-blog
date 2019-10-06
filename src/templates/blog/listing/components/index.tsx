import React from 'react'

import { Box, Flex } from 'rebass'

import Card from '../../../../core/components/card'
import Featured from '../../../../core/components/featured'
import Pagination from '../../../../core/components/pagination'
import SEO from '../../../../core/components/seo'

import { getAuthor } from '../../../../core/services/getAuthor'

import { IProps } from '../@types/IProps'

const BlogListingComponent: React.FC<IProps> = props => {
  const authors = props.data.allAuthorsJson.edges
  const posts = props.data.allMarkdownRemark.edges
  const {numPages, currentPage, featured} = props.pageContext

  return (
    <Box>
      <SEO
        author={{
          facebook: 'https://facebook.com/rayriffy',
          name: 'Phumrapee Limpianchop',
          twitter: '@rayriffy',
        }}
        type={`page`} />
      {currentPage === 1 ? (
        <Box my={4}>
          <Flex justifyContent={`center`}>
            <Box width={[1, 18/24, 16/24, 14/24]}>
              <Featured
                title={featured.node.frontmatter.title}
                subtitle={featured.node.frontmatter.subtitle}
                slug={featured.node.fields.slug}
                banner={featured.node.frontmatter.banner}
                featured={true}
              />
            </Box>
          </Flex>
        </Box>
      ) : null}
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
                    <Card author={fetchedAuthor.node} blog={frontmatter} slug={slug} type={`listing`} />
                  </Box>
                )
              })}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box my={3}>
        <Pagination numPages={numPages} currentPage={currentPage} pathPrefix="/" />
      </Box>
    </Box>
  )
}

export default BlogListingComponent
