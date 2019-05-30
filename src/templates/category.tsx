import {graphql} from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React from 'react'
import Helmet from 'react-helmet'

import {Card} from '../components/card'
import {Chip} from '../components/chip'

interface PropsInterface {
  location: object,
  data: {
    site: {
      siteMetadata: {
        title: string,
        siteUrl: string,
        author: string,
        description: string,
        fbApp: string,
      },
    },
  },
  pageContext: {
    categories: {
      key: string,
      name: string,
      desc: string,
      banner: {
        childImageSharp: {
          fluid: FluidObject,
        },
      },
    }[],
  },
}
export default class CategoryListPage extends React.Component<PropsInterface> {
  public render(): object {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const siteDescription = this.props.data.site.siteMetadata.description
    const facebookAppID = this.props.data.site.siteMetadata.fbApp

    const { categories = [] } = this.props.pageContext

    return (
      <>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              content: `${siteTitle} · Category`,
              name: 'name',
            },
            {
              content: siteDescription,
              name: 'description',
            },
            {
              content: siteAuthor,
              name: 'author',
            },
            {
              content: `${siteUrl}/default.jpg`,
              name: 'image',
            },
            {
              content: siteUrl,
              property: 'og:url',
            },
            {
              content: 'website',
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
              content: `${siteTitle} · Category`,
              property: 'og:title',
            },
            {
              content: siteDescription,
              property: 'og:description',
            },
            {
              content: facebookAppID,
              property: 'fb:app_id',
            },
            {
              content: `${siteUrl}/default.jpg`,
              property: 'og:image',
            },
            {
              content: `${siteUrl}/default.jpg`,
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
              content: '@rayriffy',
              name: 'twitter:site',
            },
            {
              content: '@rayriffy',
              name: 'twitter:creator',
            },
            {
              content: `${siteTitle} · Category`,
              name: 'twitter:title',
            },
            {
              content: siteDescription,
              name: 'twitter:description',
            },
            {
              content: `${siteUrl}/default.jpg`,
              name: 'twitter:image',
            },
          ]}
          title={`${siteTitle} · Category`}
        >
          <script type='application/ld+json' data-react-helmet='true'>
            {`
              {
                "@context": "http://schema.org/",
                "@type" : "Website",
                "url" : "${siteUrl}"
              }
            `}
          </script>
        </Helmet>
        <Chip name='Category' desc='รวมประเภท Blog ไว้ให้ง่ายต่อการเข้าถึง' />
        {categories.map(category => {
          return (
            <Card
              key={`category-${category.key}`}
              slug={`/category/${category.key}`}
              banner={category.banner.childImageSharp.fluid}
              title={category.name}
              subtitle={category.desc}
              link={true}
            />
          )
        })}
      </>
    )
  }
}

export const pageQuery = graphql`
  query categoryPageQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        fbApp
      }
    }
  }
`
