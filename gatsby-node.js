const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const POST_PER_PAGE = 6

exports.createPages = async ({ graphql, actions }) => {
  // Define createPage functions
  const { createPage } = actions

  // Get all blogs
  const gqlFetch = await graphql(`
    query NodeGqlFetchQuery {
      blogs: allContentfulBlogPost(sort: {fields: date, order: DESC}) {
        edges {
          node {
            slug
            title
            subtitle
            date
            featured
            content {
              childMarkdownRemark {
                html
              }
            }
            author {
              user
              name
            }
            banner {
              localFile {
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

      authors: allContentfulAuthor {
        edges {
          node {
            user
            twitter
            facebook
            name
          }
        }
      }

      categories: allContentfulCategory {
        edges {
          node {
            key
            name
            desc
          }
        }
      }
    }
  `)

  const {blogs, authors, categories} = gqlFetch.data

  // Get featured post
  const gqlFeatured = await graphql(`
    query NodeGqlFeaturedQuery {
      featured: allContentfulBlogPost(sort: {order: DESC, fields: date}, filter: {featured: {eq: true}}, limit: 1) {
        edges {
          node {
            slug
            title
            subtitle
            date
            featured
            content {
              childMarkdownRemark {
                html
              }
            }
            author {
              user
              name
            }
            banner {
              localFile {
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
  `)

  const featuredPost = _.head(gqlFeatured.data.featured.edges)

  console.log(featuredPost.node.banner.fluid)

  // Create blog/listing
  const blogsChunks = _.chunk(blogs.edges, POST_PER_PAGE)

  blogsChunks.map((chunk, i) => {
    createPage({
      path: i === 0 ? `/` : `/pages/${i + 1}`,
      component: path.resolve(`./src/templates/blog/listing/components/index.tsx`),
      context: {
        featured: i === 0 ? featuredPost : null,
        blogs: chunk,
        page: {
          current: i + 1,
          max: blogsChunks.length
        },
      },
    })
  })

  // Create blog/viewing
  blogs.edges.map(async (blog, i) => {
    const previosBlog = i === blogs.edges.length - 1 ? null : blogs.edges[i + 1].node
    const nextBlog = i === 0 ? null : blogs.edges[i - 1].node

    createPage({
      path: blog.node.slug,
      component: path.resolve('./src/templates/blog/viewing/components/index.tsx'),
      context: {
        node: blog.node,
        blog: {
          previous: previosBlog,
          next: nextBlog,
        },
      },
    })
  })

  // Create category/listing
  const gqlCategoryListing = await graphql(`
    query NodeGqlCategoryListingQuery {
      categories: allContentfulCategory {
        edges {
          node {
            desc
            name
            key
            blog_post {
              banner {
                localFile {
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
    }
  `)

  const transformedCategoryListing = gqlCategoryListing.data.categories.edges.map(category => {
    return {
      key: category.node.key,
      name: category.node.name,
      desc: category.node.desc,
      banner: _.head(category.node.blog_post).banner,
    }
  })

  createPage({
    path: `category`,
    component: path.resolve('./src/templates/category/listing/components/index.tsx'),
    context: {
      categories: transformedCategoryListing,
    },
  })

  // Create category/viewing
  categories.edges.map(async category => {
    const gqlCategoryViewing = await graphql(`
      query NodeGqlCategoryViewingQuery {
        blogs: allContentfulBlogPost(filter: {category: {elemMatch: {key: {eq: "${category.node.key}"}}}}, sort: {fields: date, order: DESC}) {
          edges {
            node {
              slug
              title
              subtitle
              date
              featured
              content {
                childMarkdownRemark {
                  html
                }
              }
              author {
                user
                name
              }
              banner {
                localFile {
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
    `)

    const categoryBanner = _.head(gqlCategoryViewing.data.blogs.edges).node.banner

    const categoryBlogsChunks = _.chunk(gqlCategoryViewing.data.blogs.edges, POST_PER_PAGE)

    categoryBlogsChunks.map((chunk, i) => {
      createPage({
        path: i === 0 ? `/category/${category.node.key}` : `/category/${category.node.key}/pages/${i + 1}`,
        component: path.resolve('./src/templates/category/viewing/components/index.tsx'),
        content: {
          pathPrefix: `/category/${category.node.key}`,
          blogs: chunk,
          banner: categoryBanner,
          page: {
            current: i + 1,
            max: categoryBlogsChunks.length
          },
        }
      })
    })
  })

  // Create author/listing
  const gqlAuthorListing = await graphql(`
    query NodeGqlAuthorListingQuery {
      authors: allContentfulAuthor(sort: {fields: name, order: ASC}) {
        edges {
          node {
            name
            twitter
            user
            facebook
            banner {
              localFile {
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
  `)

  const transformedAuthorListing = gqlAuthorListing.data.authors.edges.map(author => author.node)

  createPage({
    path: `author`,
    component: path.resolve('./src/templates/author/listing/components/index.tsx'),
    context: {
      authors: transformedAuthorListing,
    },
  })

  // Create author/viewing
  authors.edges.map(async author => {
    const gqlAuthorViewing = await graphql(`
      query NodeGqlAuthorViewingQuery {
        blogs: allContentfulBlogPost(filter: {author: {user: {eq: "${author.node.user}"}}}, sort: {fields: date, order: DESC}) {
          edges {
            node {
              slug
              title
              subtitle
              date
              featured
              content {
                childMarkdownRemark {
                  html
                }
              }
              author {
                user
                name
              }
              banner {
                localFile {
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

        author: contentfulAuthor(user: {eq: "${author.node.user}"}) {
          facebook
          twitter
          user
          name
          banner {
            localFile {
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
    `)

    const authorBlogChunks = _.chunk(gqlAuthorViewing.data.blogs, POST_PER_PAGE)

    authorBlogChunks.map((chunk, i) => {
      createPage({
        path: i === 0 ? `/author/${author.node.user}` : `/author/${author.node.user}/pages/${i + 1}`,
        component: path.resolve('./src/templates/author/viewing/components/index.tsx'),
        content: {
          pathPrefix: `/author/${author.node.user}`,
          blogs: chunk,
          author: gqlAuthorViewing.data.author,
          page: {
            current: i + 1,
            max: authorBlogChunks.length
          },
        }
      })
    })
  })

  return true
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (!stage.startsWith('develop')) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          react: `preact/compat`,
          "react-dom": `preact/compat`,
          "react-dom/server": `preact/compat`,
        },
      },
    })
  }
}
