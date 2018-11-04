module.exports = {
  siteMetadata: {
    title: 'Riffy Blog',
    author: 'Phumrapee Limpianchop',
    description: 'A fucking simple blog',
    siteUrl: 'https://blog.rayriffy.com',
  },
  pathPrefix: '/',
  plugins: [
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
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-embed-video",
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
              maxWidth: 590,
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
        trackingId: `UA-85367836-2`,
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
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/img/LOGO-C-min.png`,
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
    'gatsby-plugin-webpack-bundle-analyzer',
  ],
}
