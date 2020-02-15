import React from 'react'

import { Box, Flex } from 'rebass'

import Card from '../../../../core/components/card'
import Featured from '../../../../core/components/featured'
import Pagination from '../../../../core/components/pagination'
import SEO from '../../../../core/components/seo'

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
        type={`page`}
      />
      {page.current === 1 ? (
        <Box mb={4}>
          <Flex justifyContent={`center`}>
            <Box width={[1, 18 / 24, 16 / 24, 14 / 24]}>
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
            </Box>
          </Flex>
        </Box>
      ) : null}
      <Flex justifyContent={`center`}>
        <Box width={[22 / 24, 22 / 24, 20 / 24, 18 / 24]}>
          <Flex flexWrap={`wrap`} alignItems={`center`}>
            {blogs.map(blog => {
              const { author, title, subtitle, date, banner, slug } = blog.node

              const meta = {
                banner,
                date,
                subtitle,
                title,
              }

              return (
                <Box
                  width={[1, 1, 1 / 2, 1 / 2]}
                  p={3}
                  key={`listing-${page.current}-${slug}`}>
                  <Card
                    author={author}
                    blog={meta}
                    slug={slug.startsWith('/') ? slug : `/${slug}`}
                    type={`listing`}
                  />
                </Box>
              )
            })}
          </Flex>
        </Box>
      </Flex>
      <Box my={3}>
        <Pagination
          numPages={page.max}
          currentPage={page.current}
          pathPrefix='/'
        />
      </Box>
    </React.Fragment>
  )
}

export default BlogListingComponent
