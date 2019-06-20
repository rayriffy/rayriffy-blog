import React from 'react'
import Helmet from 'react-helmet'

import { graphql, StaticQuery } from 'gatsby'

interface IData {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
      siteUrl: string
      fbApp: string
    }
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
  type: string
}

const SEORenderer = (data: IData, props: IProps) => {
  const {siteMetadata} = data.site
  const {title, subtitle = siteMetadata.description, banner = '/default.jpg', author, slug = '', date, type} = props
  const {name = siteMetadata.author, facebook = 'https://facebook.com/rayriffy', twitter = '@rayriffy'} = author

  const metas = [
    {
      content: title ? `${siteMetadata.title} · ${title}` : `${siteMetadata.title}`,
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
      content: title ? `${siteMetadata.title} · ${title}` : `${siteMetadata.title}`,
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
      content: title ? `${siteMetadata.title} · ${title}` : `${siteMetadata.title}`,
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
  ]

  return (
    <Helmet meta={metas}>
        <script type="application/ld+json" data-react-helmet="true">
          {type === 'article' ? `
            {
              "@context": "http://schema.org/",
              "@type" : "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${siteMetadata.siteUrl}"
              },
              "name" : "${title ? title : siteMetadata.title}",
              "headline" : "${title ? title : siteMetadata.title}",
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
          ` : type === 'page' ? `
            {
              "@context": "http://schema.org/",
              "@type" : "Website",
              "url" : "${siteMetadata.siteUrl}"
            }
          ` : null}
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
              author
              description
              siteUrl
              fbApp
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
