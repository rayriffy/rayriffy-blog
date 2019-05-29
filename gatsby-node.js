const _ = require('lodash')
const Promise = require('bluebird')
const fs = require('fs')
const path = require('path')
const {createFilePath} = require('gatsby-source-filesystem')

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions

  let siteUrl

  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                subtitle
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
              name
              facebook
              twitter
            }
          }
        }
      }
    `,
  )

  if (result.errors) {
    throw result.errors
  }

  const postsPerPage = 5
  const categoryPathPrefix = '/category/'
  const authorPathPrefix = '/author/'

  const posts = result.data.allMarkdownRemark.edges
  const catrgories = result.data.allCategoriesJson.edges
  const authors = result.data.allAuthorsJson.edges

  // Create blog lists pages.
  const numPages = Math.ceil(posts.length / postsPerPage)

  _.times(numPages, i => {
    createPage({
      path: i === 0 ? `/` : `/pages/${i + 1}`,
      component: path.resolve('./src/templates/blog-list.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create blog posts pages.
  let count = 0
  let jsonFeed = []
  _.each(posts, (post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    if (count < 6) {
      jsonFeed.push({
        name: post.node.frontmatter.title,
        desc: post.node.frontmatter.subtitle,
        slug: siteUrl + post.node.fields.slug,
        banner:
          siteUrl + post.node.frontmatter.banner.childImageSharp.fluid.src,
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

  fs.writeFile('public/feed.json', JSON.stringify(jsonFeed), err => {
    if (err) {
      throw err
    }
  })

  // Create category pages

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
                  title
                }
              }
            }
          }
        }
      `,
    )

    let totalCount = categoryResult.data.blogs.edges.length

    let categoryPages = Math.ceil(totalCount / postsPerPage)
    let pathPrefix = categoryPathPrefix + category.node.key

    _.times(categoryPages, i => {
      createPage({
        path: i === 0 ? pathPrefix : `${pathPrefix}/pages/${i + 1}`,
        component: path.resolve('./src/templates/category-list.tsx'),
        context: {
          category: category.node.key,
          currentPage: i + 1,
          limit: postsPerPage,
          numPages: categoryPages,
          pathPrefix,
          regex: `/${category.node.key}/`,
          skip: i * postsPerPage,
        },
      })
    })
  })

  // Create author pages

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
                  title
                }
              }
            }
          }
        }
      `,
    )

    let totalCount = authorResult.data.blogs.edges.length

    let authorPages = Math.ceil(totalCount / postsPerPage)
    let pathPrefix = authorPathPrefix + author.node.user
    _.times(authorPages, i => {
      createPage({
        path: i === 0 ? pathPrefix : `${pathPrefix}/pages/${i + 1}`,
        component: path.resolve('./src/templates/author-list.tsx'),
        context: {
          author: author.node.user,
          currentPage: i + 1,
          limit: postsPerPage,
          numPages: authorPages,
          pathPrefix,
          regex: `/${author.node.user}/`,
          skip: i * postsPerPage,
        },
      })
    })
  })

  /*
   * NOTE: PageContext cannot pass variable that return from async function!
   */

  // Create category list page
  const categoryRaw = []
  const categoryPromise = []

  const fetchCategory = async category => {
    const categoryResult = await graphql(
      `
        {
          blogs: allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            filter: {frontmatter: {category: {regex: "/${category.node.key}/"}}}
            limit: 1
          ) {
            edges {
              node {
                frontmatter {
                  banner {
                    childImageSharp {
                      fluid(maxWidth: 1000, quality: 90) {
                        base64
                        tracedSVG
                        aspectRatio
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                        sizes
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    )

    const categoryTopBlog = _.head(categoryResult.data.blogs.edges)

    return categoryRaw.push({
      key: category.node.key,
      name: category.node.name,
      desc: category.node.desc,
      banner: categoryTopBlog.node.frontmatter.banner,
    })
  }

  _.each(catrgories, category => {
    categoryPromise.push(fetchCategory(category))
  })

  await Promise.all(categoryPromise)

  createPage({
    path: categoryPathPrefix,
    component: path.resolve('./src/templates/category.tsx'),
    context: {
      categories: _.sortBy(categoryRaw, o => o.key),
    },
  })

  // Create author list page
  const authorRaw = []
  const authorPromise = []

  const fetchAuthor = async author => {
    const authorResult = await graphql(
      `
        {
          author: file(relativePath: {eq: "${author.node.user}.jpg"}) {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 90) {
                base64
                tracedSVG
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
          }
        }
      `,
    )

    return authorRaw.push({
      user: author.node.user,
      name: author.node.name,
      facebook: author.node.facebook,
      twitter: author.node.twitter,
      banner: authorResult.data.author,
    })
  }

  _.each(authors, author => {
    authorPromise.push(fetchAuthor(author))
  })

  await Promise.all(authorPromise)

  createPage({
    path: authorPathPrefix,
    component: path.resolve('./src/templates/author.tsx'),
    context: {
      authors: authorRaw,
    },
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
