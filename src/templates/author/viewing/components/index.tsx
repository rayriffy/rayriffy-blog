import React from 'react'
import { Helmet } from 'react-helmet'

import { graphql } from 'gatsby'

import { Box, Flex } from 'rebass'

import Card from '../../../../core/components/card'
import Featured from '../../../../core/components/featured'
import Navbar from '../../../../core/components/navbar'
import Pagination from '../../../../core/components/pagination'
import SEO from '../../../../core/components/seo'

import { IProps } from '../@types/IProps'

const AuthorViewingComponent: React.FC<IProps> = props => {
  const posts = props.data.allMarkdownRemark.edges
  const author = props.data.authorsJson
  const authorName = author.name

  const {currentPage, numPages, pathPrefix, banner} = props.pageContext

  return (
    <Box>
      <Helmet title={authorName} />
      <SEO
        title={authorName}
        banner={banner.childImageSharp.fluid.src}
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
              title={authorName}
              banner={banner}
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
      <Box>
        <Flex justifyContent={`center`}>
          <Box width={[22/24, 22/24, 20/24, 18/24]}>
            <Flex flexWrap={`wrap`}>
              {posts.map(({node}) => {
                return (
                  <Box width={[1, 1, 1/2, 1/2]} p={3} key={node.fields.slug}>
                    <Card
                      slug={node.fields.slug}
                      author={props.data.authorsJson}
                      blog={node.frontmatter}
                      type={`listing`}
                    />
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

export default AuthorViewingComponent
