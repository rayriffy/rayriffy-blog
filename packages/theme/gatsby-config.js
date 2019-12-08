module.exports = ({ contentful, seo }) => ({
  pathPrefix: '/',
  siteMetadata: {
    title: seo.meta.siteName,
    author: seo.meta.author,
    description: seo.meta.description,
    siteUrl: seo.meta.url,
    fbApp: seo.apps.facebook,
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: contentful.space,
        accessToken: contentful.token,
        host:
        contentful.preview
            ? 'preview.contentful.com'
            : 'cdn.contentful.com',
        downloadLocal: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
        ignore: [`**/.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
        ignore: [`**/.*`],
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      opions: {
        sourceMap: true,
        cssPropOptimization: true,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [
              {
                userAgent: '*',
                disallow: ['/author/*', '/category/*', '/pages/*'],
              },
            ],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        exclude: ['/**/pages/*', '/category/**/*', '/author/**/*'],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              usePrefix: true,
              providers: {
                include: [
                  'SoundCloud',
                  'Instagram',
                  'Spotify',
                  'Facebook (Post)',
                  'Facebook (Video)',
                  'Twitter',
                ],
                settings: {
                  SoundCloud: {
                    color: '#1976d2',
                    show_comments: false,
                    visual: false,
                    hide_related: true,
                    auto_play: false,
                    show_user: false,
                    show_reposts: false,
                    show_teaser: false,
                  },
                  Instagram: { hidecaption: true },
                },
              },
            },
          },
          'gatsby-remark-embed-video',
          {
            resolve: 'gatsby-remark-embed-gist',
            options: {
              username: 'rayriffy',
              includeDefaultCss: true,
            },
          },
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
              backgroundColor: `rgb(60, 60, 60)`,
              withWebp: true,
              quality: 80,
            },
          },
          'gatsby-remark-responsive-iframe',
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: seo.analytics.tracker,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: seo.meta.siteName,
        short_name: seo.meta.siteName,
        start_url: `/`,
        background_color: `#f5f5f5`,
        theme_color: `#1e88e5`,
        display: `minimal-ui`,
        icon: `${__dirname}/content/assets/logo.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/api/*': ['Access-Control-Allow-Origin: *'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {
        cachePublic: true,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
  ],
})
