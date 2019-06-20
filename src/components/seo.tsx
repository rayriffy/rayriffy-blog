import React from 'react'
import Helmet from 'react-helmet'

import { graphql, StaticQuery } from 'gatsby'

interface IData {
  siteMetadata: {
    title: string
    description: string
    author: string
    siteUrl: string
    fbApp: string
  }
}

interface IProps {
  title?: string
  subtitle?: string
  banner?: string
  author: {
    name?: string
    facebook?: string
    twitter?: string
  },
  slug?: string
  date?: string
}

const SEORenderer = (data: IData, props: IProps) => {
  const {siteMetadata} = data
  const {title = siteMetadata.title, subtitle = siteMetadata.description, banner = '/default.jpg', author, slug = '', date} = props
  const {name = siteMetadata.author, facebook = 'https://facebook.com/rayriffy', twitter = '@rayriffy'} = author

  return (
    <Helmet
      meta={[
        {
          content: `${siteMetadata.title} · ${title}`,
          name: 'name',
        },
        {
          content: subtitle,
          name: 'description',
        },
        {
          content: name,
          name: 'author',
        },
        {
          content: `${siteMetadata.siteUrl}${banner}`,
          name: 'image',
        },
        {
          content: `${siteMetadata.siteUrl}${slug}`,
          property: 'og:url',
        },
        {
          content: 'article',
          property: 'og:type',
        },
        {
          content: 'th_TH',
          property: 'og:locale',
        },
        {
          content: 'en_US',
          property: 'og:locale:alternate',
        },
        {
          content: `${siteMetadata.title} · ${title}`,
          property: 'og:title',
        },
        {
          content: subtitle,
          property: 'og:description',
        },
        {
          content: siteMetadata.fbApp,
          property: 'fb:app_id',
        },
        {
          content: facebook,
          property: 'article:author',
        },
        {
          content: date,
          property: 'article:published_time',
        },
        {
          content: `${siteMetadata.siteUrl}${banner}`,
          property: 'og:image',
        },
        {
          content: `${siteMetadata.siteUrl}${banner}`,
          property: 'og:image:secure_url',
        },
        {
          content: 'banner',
          property: 'og:image:alt',
        },
        {
          content: '1500',
          property: 'og:image:width',
        },
        {
          content: '788',
          property: 'og:image:height',
        },
        {
          content: 'summary_large_image',
          name: 'twitter:card',
        },
        {
          content: twitter,
          name: 'twitter:site',
        },
        {
          content: twitter,
          name: 'twitter:creator',
        },
        {
          content: `${siteMetadata.title} · ${title}`,
          name: 'twitter:title',
        },
        {
          content: subtitle,
          name: 'twitter:description',
        },
        {
          content: `${siteMetadata.siteUrl}${banner}`,
          name: 'twitter:image',
        },
        {
          content: 'nositelinkssearchbox',
          name: 'google',
        },
      ]}>
        <script type="application/ld+json" data-react-helmet="true">
          {`
            {
              "@context": "http://schema.org/",
              "@type" : "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${siteMetadata.siteUrl}"
              },
              "name" : "${title}",
              "headline" : "${title}",
              "backstory" : "${subtitle}",
              "author" : {
                "@type" : "Person",
                "name" : "${name}"
              },
              "datePublished" : "${date}",
              "dateModified" : "${date}",
              "image" : "${siteMetadata.siteUrl}${banner}",
              "url" : "${siteMetadata.siteUrl}${slug}",
              "description" : "${subtitle}",
              "publisher" : {
                "@type" : "Organization",
                "name" : "${siteMetadata.title}",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${`${siteMetadata.siteUrl}/icon.png`}"
                }
              }
            }
          `}
        </script>
      </Helmet>
  )
}

const Component: React.SFC<IProps> = props => {
  return (
    <StaticQuery
      query={graphql`
        query SEOQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
// tslint:disable-next-line: jsx-no-lambda
      render={data => SEORenderer(data, props)}
    />
  )
}

export default Component
