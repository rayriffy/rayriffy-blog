const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const POST_PER_PAGE = 6

exports.createPages = async ({ graphql, actions }) => {
  // Define createPage functions
  const { createPage } = actions

  // Get all blogs, authors and categories
  const dataResult = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }

      blogs: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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

      authors: allAuthorsJson {
        edges {
          node {
            user
            name
            facebook
            twitter
          }
        }
      }

      categories: allCategoriesJson {
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

  const {site, blogs, authors, categories} = dataResult.data

  // Get featured post
  const featuredResult = await graphql(`
    {
      featured: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {featured: {eq: true}}}, limit: 1) {
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

  const featuredPost = _.head(featuredResult.data.featured.edges)

  // Create blog listing
  const blogListingPages = Math.ceil(blogs.edges.length / POST_PER_PAGE)

  _.times(blogListingPages, i => {
    createPage({
      path: i === 0 ? `/` : `/pages/${i + 1}`,
      component: path.resolve('./src/templates/blog-list.tsx'),
      context: {
        featured: i === 0 ? featuredPost : null,
        skip: i * POST_PER_PAGE,
        limit: POST_PER_PAGE,
        currentPage: i + 1,
        numPages: blogListingPages,
      },
    })
  })

  // Create blog posts
  _.each(blogs.edges, (blog, i) => {
    const previousBlog = i === blogs.edges.length - 1 ? null : blogs.edges[i + 1].node
    const nextBlog = i === 0 ? null : blogs.edges[i - 1].node

    createPage({
      path: blog.node.fields.slug,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        author: blog.node.frontmatter.author,
        slug: blog.node.fields.slug,
        previous: previousBlog,
        next: nextBlog,
      },
    })
  })

  // Create feed API
  const feedBlogs = _.slice(blogs.edges, 0, POST_PER_PAGE).map(o => ({
    name: o.node.frontmatter.title,
    desc: o.node.frontmatter.subtitle,
    slug: `${site.siteMetadata.siteUrl}${o.node.fields.slug}`,
    banner: `${site.siteMetadata.siteUrl}${o.node.frontmatter.banner.childImageSharp.fluid.src}`,
  }))

  if (!fs.existsSync('public/api')) {
    fs.mkdirSync('public/api', function(err) {
      if (err) {
        console.error(err)
        throw err
      }
    })
  }

  fs.writeFile('public/api/feed.json', JSON.stringify(feedBlogs), err => {
    if (err) {
      throw err
    }
  })

  // Create category blog listing page
  const categoryBlogRaw = []

  const fetchCategoryBlog = async category => {
    const categoryResult = await graphql(`
      {
        blogs: allMarkdownRemark(
          filter: {frontmatter: {category: {regex: "/${category.node.key}/"}}}
        ) {
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
        banner: allMarkdownRemark(
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
    `)

    return categoryBlogRaw.push({
      category,
      raw: categoryResult.data,
    })
  }

  await Promise.all(categories.edges.map(category => fetchCategoryBlog(category)))

  categoryBlogRaw.map(o => {
    const categoryListingPages = Math.ceil(o.raw.blogs.edges.length / POST_PER_PAGE)

    _.times(categoryListingPages, i => createPage({
      path: i === 0 ? `/category/${o.category.node.key}` : `/category/${o.category.node.key}/pages/${i + 1}`,
      component: path.resolve('./src/templates/category-blog.tsx'),
      context: {
        pathPrefix: `/category/${o.category.node.key}`,
        banner: _.head(o.raw.banner.edges),
        category: o.category.node.key,
        currentPage: i + 1,
        numPages: categoryListingPages,
        regex: `/${o.category.node.key}/`,
        limit: POST_PER_PAGE,
        skip: i * POST_PER_PAGE,
      },
    }))
  })

  // Create API feed for each category
  categoryBlogRaw.map(o => {
    const categoryFeed = _.slice(o.raw.blogs.edges, 0, POST_PER_PAGE).map(o => ({
      name: o.node.frontmatter.title,
      desc: o.node.frontmatter.subtitle,
      slug: `${site.siteMetadata.siteUrl}${o.node.fields.slug}`,
      banner: `${site.siteMetadata.siteUrl}${o.node.frontmatter.banner.childImageSharp.fluid.src}`,
    }))

    if (!fs.existsSync('public/api/category')) {
      fs.mkdirSync('public/api/category', function(err) {
        if (err) {
          console.error(err)
          throw err
        }
      })
    }

    fs.writeFile(`public/api/category/${o.category.node.key}.json`, JSON.stringify(categoryFeed), err => {
      if (err) {
        throw err
      }
    })
  })

  // Create author blog listing page
  const authorBlogRaw = []

  const fetchAuthorBlog = async author => {
    const authorResult = await graphql(`
      {
        blogs: allMarkdownRemark(
          filter: {frontmatter: {author: {regex: "/${author.node.user}/"}}}
        ) {
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
        banner: file(relativePath: {eq: "author.${author.node.user}.jpg"}) {
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
    `)

    return authorBlogRaw.push({
      author,
      raw: authorResult.data,
    })
  }

  await Promise.all(authors.edges.map(author => fetchAuthorBlog(author)))

  authorBlogRaw.map(o => {
    const authorListingPages = Math.ceil(o.raw.blogs.edges.length / POST_PER_PAGE)

    _.times(authorListingPages, i => createPage({
      path: i === 0 ? `/author/${o.author.node.user}` : `/author/${o.author.node.user}/pages/${i + 1}`,
      component: path.resolve('./src/templates/author-blog.tsx'),
      context: {
        pathPrefix: `/author/${o.author.node.user}`,
        banner: o.raw.banner,
        author: o.author.node.user,
        currentPage: i + 1,
        numPages: authorListingPages,
        regex: `/${o.author.node.user}/`,
        limit: POST_PER_PAGE,
        skip: i * POST_PER_PAGE,
      },
    }))
  })

  // Create API feed for each author
  authorBlogRaw.map(o => {
    const authorFeed = _.slice(o.raw.blogs.edges, 0, POST_PER_PAGE).map(o => ({
      name: o.node.frontmatter.title,
      desc: o.node.frontmatter.subtitle,
      slug: `${site.siteMetadata.siteUrl}${o.node.fields.slug}`,
      banner: `${site.siteMetadata.siteUrl}${o.node.frontmatter.banner.childImageSharp.fluid.src}`,
    }))

    if (!fs.existsSync('public/api/author')) {
      fs.mkdirSync('public/api/author', function(err) {
        if (err) {
          console.error(err)
          throw err
        }
      })
    }

    fs.writeFile(`public/api/author/${o.author.node.user}.json`, JSON.stringify(authorFeed), err => {
      if (err) {
        throw err
      }
    })
  })

  /*
   * NOTE: PageContext cannot pass variable that return from async function!
   */

  // Create category list page
  const categoryRaw = []

  const fetchCategoryList = async category => {
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
      `
    )

    const categoryTopBlog = _.head(categoryResult.data.blogs.edges)

    return categoryRaw.push({
      key: category.node.key,
      name: category.node.name,
      desc: category.node.desc,
      banner: categoryTopBlog.node.frontmatter.banner,
    })
  }

  await Promise.all(categories.edges.map(category => fetchCategoryList(category)))

  createPage({
    path: `/category`,
    component: path.resolve('./src/templates/category-list.tsx'),
    context: {
      categories: _.sortBy(categoryRaw, o => o.name),
    },
  })

  // Create author list page
  const authorRaw = []

  const fetchAuthorList = async author => {
    const authorResult = await graphql(
      `
        {
          banner: file(relativePath: {eq: "author.${author.node.user}.jpg"}) {
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
      `
    )

    return authorRaw.push({
      user: author.node.user,
      name: author.node.name,
      facebook: author.node.facebook,
      twitter: author.node.twitter,
      banner: authorResult.data.banner,
    })
  }

  await Promise.all(authors.edges.map(author => fetchAuthorList(author)))

  createPage({
    path: `/author`,
    component: path.resolve('./src/templates/author-list.tsx'),
    context: {
      authors: _.sortBy(authorRaw, o => o.name),
    },
  })

  return true
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

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    }
  }
}
