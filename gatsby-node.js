const _ = require('lodash')
const Promise = require('bluebird')
const fs = require('fs');
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

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
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
          }
        `
      ).then(result => {
        siteUrl = result.data.site.siteMetadata.siteUrl
        if (process.env.GATSBY_ENV === 'production' || process.env.GATSBY_ENV === 'staging') {
          var filteredresult = {data: {allMarkdownRemark: {edges: null}}}
          filteredresult.data.allMarkdownRemark.edges = result.data.allMarkdownRemark.edges.filter(a => a.node.frontmatter.status === 'published')
        }
        else if (process.env.GATSBY_ENV === 'development') {
          var filteredresult = result
        }
        return filteredresult
      }

      ).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges;

        // Create blog lists pages.
        const postsPerPage = 5;
        const numPages = Math.ceil(posts.length / postsPerPage);

        _.times(numPages, i => {

          if (process.env.GATSBY_ENV === 'production' || process.env.GATSBY_ENV === 'staging') {
            var filter = 'draft'
          }
          else if (process.env.GATSBY_ENV === 'development') {
            var filter = ''
          }

          createPage({
            path: i === 0 ? `/` : `/pages/${i + 1}`,
            component: path.resolve('./src/templates/blog-list.js'),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              status: filter,
              numPages,
              currentPage: i + 1
            },
          });
        });

        // Create blog posts pages.
        var count = 0
        var jsonFeed = []
        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          if(count < 5) {
            jsonFeed.push(
              {
                "name": post.node.frontmatter.title,
                "desc": post.node.frontmatter.subtitle,
                "urls": siteUrl + post.node.fields.slug
              }
            )
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

        fs.writeFile('public/feed.json', JSON.stringify(jsonFeed), function(err) {
          if (err) {
            console.error(err)
            reject(err)
          }
        })

      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
