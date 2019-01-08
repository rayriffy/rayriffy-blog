const _ = require('lodash')
const Promise = require('bluebird')
const fs = require('fs')
const path = require('path')
const {createFilePath} = require('gatsby-source-filesystem')

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  var siteUrl

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
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
            lifestyle: allMarkdownRemark(
              filter: {frontmatter: {category: {regex: "/lifestyle/"}}}
            ) {
              edges {
                node {
                  frontmatter {
                    status
                  }
                }
              }
            }
            misc: allMarkdownRemark(
              filter: {frontmatter: {category: {regex: "/misc/"}}}
            ) {
              edges {
                node {
                  frontmatter {
                    status
                  }
                }
              }
            }
            music: allMarkdownRemark(
              filter: {frontmatter: {category: {regex: "/music/"}}}
            ) {
              edges {
                node {
                  frontmatter {
                    status
                  }
                }
              }
            }
            programming: allMarkdownRemark(
              filter: {frontmatter: {category: {regex: "/programming/"}}}
            ) {
              edges {
                node {
                  frontmatter {
                    status
                  }
                }
              }
            }
            review: allMarkdownRemark(
              filter: {frontmatter: {category: {regex: "/review/"}}}
            ) {
              edges {
                node {
                  frontmatter {
                    status
                  }
                }
              }
            }
            tutorial: allMarkdownRemark(
              filter: {frontmatter: {category: {regex: "/tutorial/"}}}
            ) {
              edges {
                node {
                  frontmatter {
                    status
                  }
                }
              }
            }
            rayriffy: allMarkdownRemark(
              filter: {frontmatter: {author: {regex: "/rayriffy/"}}}
            ) {
              edges {
                node {
                  frontmatter {
                    status
                  }
                }
              }
            }
            SiriuSStarS: allMarkdownRemark(
              filter: {frontmatter: {author: {regex: "/SiriuSStarS/"}}}
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
        .then(result => {
          siteUrl = result.data.site.siteMetadata.siteUrl
          var filteredresult
          if (
            process.env.GATSBY_ENV === 'production' ||
            process.env.GATSBY_ENV === 'staging'
          ) {
            filteredresult = {
              data: {
                allMarkdownRemark: {edges: null},
                allCategoriesJson: {edges: null},
                allAuthorsJson: {edges: null},
                lifestyle: {edges: null},
                misc: {edges: null},
                music: {edges: null},
                programming: {edges: null},
                review: {edges: null},
                tutorial: {edges: null},
                rayriffy: {edges: null},
                SiriuSStarS: {edges: null},
              },
            }
            filteredresult.data.allMarkdownRemark.edges = result.data.allMarkdownRemark.edges.filter(
              a => a.node.frontmatter.status === 'published',
            )
            filteredresult.data.lifestyle.edges = result.data.lifestyle.edges.filter(
              a => a.node.frontmatter.status === 'published',
            )
            filteredresult.data.misc.edges = result.data.misc.edges.filter(
              a => a.node.frontmatter.status === 'published',
            )
            filteredresult.data.music.edges = result.data.music.edges.filter(
              a => a.node.frontmatter.status === 'published',
            )
            filteredresult.data.programming.edges = result.data.programming.edges.filter(
              a => a.node.frontmatter.status === 'published',
            )
            filteredresult.data.review.edges = result.data.review.edges.filter(
              a => a.node.frontmatter.status === 'published',
            )
            filteredresult.data.tutorial.edges = result.data.tutorial.edges.filter(
              a => a.node.frontmatter.status === 'published',
            )
            filteredresult.data.rayriffy.edges = result.data.rayriffy.edges.filter(
              a => a.node.frontmatter.status === 'published',
            )
            filteredresult.data.SiriuSStarS.edges = result.data.SiriuSStarS.edges.filter(
              a => a.node.frontmatter.status === 'published',
            )
            filteredresult.data.allCategoriesJson.edges =
              result.data.allCategoriesJson.edges
            filteredresult.data.allAuthorsJson.edges =
              result.data.allAuthorsJson.edges
          } else if (process.env.GATSBY_ENV === 'development') {
            filteredresult = result
          }
          return filteredresult
        })
        .then(result => {
          if (result.errors) {
            console.error(result.errors)
            reject(result.errors)
          }

          const posts = result.data.allMarkdownRemark.edges
          const catrgories = result.data.allCategoriesJson.edges
          const authors = result.data.allAuthorsJson.edges

          var filter
          const postsPerPage = 5
          if (
            process.env.GATSBY_ENV === 'production' ||
            process.env.GATSBY_ENV === 'staging'
          ) {
            filter = 'draft'
          } else if (process.env.GATSBY_ENV === 'development') {
            filter = ''
          }

          // Create blog lists pages.
          const numPages = Math.ceil(posts.length / postsPerPage)

          _.times(numPages, i => {
            createPage({
              path: i === 0 ? `/` : `/pages/${i + 1}`,
              component: path.resolve('./src/templates/blog-list.js'),
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

            if (count < 5) {
              jsonFeed.push({
                name: post.node.frontmatter.title,
                desc: post.node.frontmatter.subtitle,
                slug: siteUrl + post.node.fields.slug,
              })
            }

            createPage({
              path: post.node.fields.slug,
              component: path.resolve('./src/templates/blog-post.js'),
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
          var categoryPathPrefix = 'category/'
          _.each(catrgories, (category, index) => {
            var totalCount = result.data[category.node.key].edges.length
            var numCategoryPages = Math.ceil(totalCount / postsPerPage)
            var pathPrefix = categoryPathPrefix + category.node.key
            _.times(numCategoryPages, i => {
              createPage({
                path: i === 0 ? pathPrefix : pathPrefix + `/pages/${i + 1}`,
                component: path.resolve('./src/templates/category.js'),
                context: {
                  category: category.node.key,
                  currentPage: i + 1,
                  limit: postsPerPage,
                  numPages: numCategoryPages,
                  pathPrefix,
                  regex: '/' + category.node.key + '/',
                  skip: i * postsPerPage,
                  status: filter,
                },
              })
            })
          })

          // Create author pages
          var authorPathPrefix = 'author/'
          _.each(authors, (author, index) => {
            var totalCount = result.data[author.node.user].edges.length
            var numAuthorPages = Math.ceil(totalCount / postsPerPage)
            var pathPrefix = authorPathPrefix + author.node.user
            _.times(numAuthorPages, i => {
              createPage({
                path: i === 0 ? pathPrefix : pathPrefix + `/pages/${i + 1}`,
                component: path.resolve('./src/templates/author.js'),
                context: {
                  author: author.node.user,
                  currentPage: i + 1,
                  limit: postsPerPage,
                  numPages: numAuthorPages,
                  pathPrefix,
                  regex: '/' + author.node.user + '/',
                  skip: i * postsPerPage,
                  status: filter,
                },
              })
            })
          })
        }),
    )
  })
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
