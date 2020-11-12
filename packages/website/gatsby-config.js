const { GATSBY_ENV = 'production', CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID, CONTENTFUL_PREVIEW = false } = process.env

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-rayriffy-blog`,
      options: {
        contentful: {
          space: CONTENTFUL_SPACE_ID,
          token: CONTENTFUL_ACCESS_TOKEN,
          preview: CONTENTFUL_PREVIEW === 'true',
        },
        seo: {
          meta: {
            siteName: 'Riffy Blog',
            author: 'Phumrapee Limpianchop',
            description: 'The Nerdy Blogger',
            url: `${
              GATSBY_ENV === 'production'
                ? `https://blog.rayriffy.com`
                : GATSBY_ENV === 'staging'
                ? `https://staging.blog.rayriffy.com`
                : GATSBY_ENV === 'preview'
                ? `https://preview.blog.rayriffy.com`
                : `https://localhost:8000`
            }`,
          },
          apps: {
            facebook: '342680353046527',
          },
          robots: {
            policy: [
              {
                userAgent: '*',
                disallow: ['/pages', '/category', '/author'],
              },
            ],
          },
          sitemap: {
            exclude: [
              '/**/pages/*',
              '/category/**/*',
              '/author/**/*',
            ],
          },
          analytics: {
            tracker: GATSBY_ENV === 'production' ? 'UA-85367836-2' : GATSBY_ENV === 'staging' ? 'UA-85367836-3' : ''
          }
        },
      },
    },
  ],
}
