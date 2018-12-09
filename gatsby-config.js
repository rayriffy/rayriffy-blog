if (process.env.GATSBY_ENV === 'production') {
  var hostname = 'https://blog.rayriffy.com'
}
else if (process.env.GATSBY_ENV === 'staging') {
  var hostname = 'https://blog-staging.rayriffy.com'
}
else if (process.env.GATSBY_ENV === 'development') {
  var hostname = 'https://localhost:8000'
}

module.exports = {
  siteMetadata: {
    title: 'Riffy Blog',
    author: 'Phumrapee Limpianchop',
    description: 'The Nerdy Blogger',
    siteUrl: `${hostname}`,
  },
  pathPrefix: '/',
  plugins: [
    `gatsby-plugin-netlify-cache`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/assets/database`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => process.env.GATSBY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*', disallow: ['/pages'] }]
          },
          staging: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/feed.json": [
            "Access-Control-Allow-Origin: *"
          ],
        },
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        exclude: ["/pages/*"],
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: 'assets',
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-embed-spotify",
          "riffy-gjs-embeded-video",
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              username: 'rayriffy',
              includeDefaultCss: true,
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
              sizeByPixelDensity: true,
              withWebp: true,
              quality: 95
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `${(process.env.GATSBY_ENV === 'production') ? 'UA-85367836-2' : ((process.env.GATSBY_ENV === 'staging') ? 'UA-85367836-3' : '')}`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Riffy Blog`,
        short_name: `Riffy Blog`,
        start_url: `/`,
        background_color: `#f5f5f5`,
        theme_color: `#1e88e5`,
        display: `minimal-ui`,
        icon: `src/assets/logo.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        omitGoogleFont: true,
      },
    },
  ],
}
