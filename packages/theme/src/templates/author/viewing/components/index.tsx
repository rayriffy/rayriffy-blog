import React from 'react'
import { Helmet } from 'react-helmet'

import { Box, Flex } from 'rebass'

import Card from '../../../../core/components/card'
import Featured from '../../../../core/components/featured'
import Navbar from '../../../../core/components/navbar'
import Pagination from '../../../../core/components/pagination'
import SEO from '../../../../core/components/seo'

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
      <Box my={4}>
        <Flex justifyContent={`center`}>
          <Box width={[1, 18 / 24, 16 / 24, 14 / 24]}>
            <Featured
              title={author.name}
              banner={author.banner}
              featured={false}
            />
          </Box>
        </Flex>
      </Box>
      <Box mb={3}>
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
      </Box>
      <Flex justifyContent={`center`}>
        <Box width={[22 / 24, 22 / 24, 20 / 24, 18 / 24]}>
          <Flex flexWrap={`wrap`} alignItems={`center`}>
            {blogs.map(blog => {
              const { title, subtitle, date, banner, slug } = blog.node

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
                    key={slug}
                    slug={slug.startsWith('/') ? slug : `/${slug}`}
                    author={author}
                    blog={meta}
                    type={`listing`}
                  />
                </Box>
              )
            })}
          </Flex>
        </Box>
      </Flex>
      <Pagination
        numPages={page.max}
        currentPage={page.current}
        pathPrefix={pathPrefix}
      />
    </React.Fragment>
  )
}

export default AuthorViewingComponent
