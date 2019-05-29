const _ = require('lodash')
const Promise = require('bluebird')
const fs = require('fs')
const path = require('path')
const {createFilePath} = require('gatsby-source-filesystem')

const {GATSBY_ENV = 'development'} = process.env

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions

  var siteUrl

  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allMarkdownRemark(
          sort: {fields: [frontmatter___date], order: DESC}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                subtitle
                status
                author
                banner {
                  childImageSharp {
                    fluid(maxWidth: 1000, quality: 90) {
                      src
                      srcSet
                    }
                  }
                }
              }
            }
          }
        }
        allCategoriesJson {
          edges {
            node {
              key
              name
              desc
            }
          }
        }
        allAuthorsJson {
          edges {
            node {
              user
            }
          }
        }
      }
    `,
  )

  if (result.errors) {
    reject(result.errors)
  }

  const postsPerPage = 5

  const posts = result.data.allMarkdownRemark.edges
  const catrgories = result.data.allCategoriesJson.edges
  const authors = result.data.allAuthorsJson.edges

  let filter
  if (GATSBY_ENV === 'production' || GATSBY_ENV === 'staging') {
    filter = 'draft'
  } else if (GATSBY_ENV === 'development') {
    filter = ''
  }

  // Create blog lists pages.
  const numPages = Math.ceil(posts.length / postsPerPage)

  _.times(numPages, i => {
    createPage({
      path: i === 0 ? `/` : `/pages/${i + 1}`,
      component: path.resolve('./src/templates/blog-list.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        status: filter,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create blog posts pages.
  var count = 0
  var jsonFeed = []
  _.each(posts, (post, index) => {
    const previous =
      index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    if (count < 6) {
      jsonFeed.push({
        name: post.node.frontmatter.title,
        desc: post.node.frontmatter.subtitle,
        slug: siteUrl + post.node.fields.slug,
        banner:
          siteUrl +
          post.node.frontmatter.banner.childImageSharp.fluid.src,
      })
    }

    createPage({
      path: post.node.fields.slug,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        author: post.node.frontmatter.author,
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
    count++
  })

  fs.writeFile('public/feed.json', JSON.stringify(jsonFeed), function(
    err,
  ) {
    if (err) {
      console.error(err)
      reject(err)
    }
  })

  // Create category pages
  const categoryPathPrefix = '/category/'

  _.each(catrgories, async category => {
    const categoryResult = await graphql(
      `
        {
          blogs: allMarkdownRemark(
            filter: {frontmatter: {category: {regex: "/${category.node.key}/"}}}
          ) {
            edges {
              node {
                frontmatter {
                  status
                }
              }
            }
          }
        }
      `,
    )

    var totalCount = categoryResult.data.blogs.edges.length

    var categoryPages = Math.ceil(totalCount / postsPerPage)
    var pathPrefix = categoryPathPrefix + category.node.key

    _.times(categoryPages, i => {
      createPage({
        path: i === 0 ? pathPrefix : `${pathPrefix}/pages/${i + 1}`,
        component: path.resolve('./src/templates/category.tsx'),
        context: {
          category: category.node.key,
          currentPage: i + 1,
          limit: postsPerPage,
          numPages: categoryPages,
          pathPrefix,
          regex: `/${category.node.key}/`,
          skip: i * postsPerPage,
          status: filter,
        },
      })
    })
  })

  // Create author pages
  var authorPathPrefix = '/author/'

  _.each(authors, async author => {
    const authorResult = await graphql(
      `
        {
          blogs: allMarkdownRemark(
            filter: {frontmatter: {author: {regex: "/${author.node.user}/"}}}
          ) {
            edges {
              node {
                frontmatter {
                  status
                }
              }
            }
          }
        }
      `,
    )

    var totalCount = authorResult.data.blogs.edges.length

    var authorPages = Math.ceil(totalCount / postsPerPage)
    var pathPrefix = authorPathPrefix + author.node.user
    _.times(authorPages, i => {
      createPage({
        path: i === 0 ? pathPrefix : `${pathPrefix}/pages/${i + 1}`,
        component: path.resolve('./src/templates/author.tsx'),
        context: {
          author: author.node.user,
          currentPage: i + 1,
          limit: postsPerPage,
          numPages: authorPages,
          pathPrefix,
          regex: `/${author.node.user}/`,
          skip: i * postsPerPage,
          status: filter,
        },
      })
    })
  })

  return null
}

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode})
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({getConfig, stage}) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    }
  }
}
