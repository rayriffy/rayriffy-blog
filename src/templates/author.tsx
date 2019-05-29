import {graphql} from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React from 'react'
import Helmet from 'react-helmet'

import {FaFacebook, FaTwitter} from 'react-icons/fa'

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
    authors: {
      user: string,
      name: string,
      facebook: string,
      twitter: string,
      banner: {
        childImageSharp: {
          fluid: FluidObject,
        },
      },
    }[],
  }
}
export default class AuthorListPage extends React.Component<PropsInterface> {
  public render(): object {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const siteDescription = this.props.data.site.siteMetadata.description
    const facebookAppID = this.props.data.site.siteMetadata.fbApp

    const { authors = [] } = this.props.pageContext

    return (
      <>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              content: `${siteTitle} · Authors`,
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
              content: `${siteTitle} · Authors`,
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
              content: 'https://facebook.com/rayriffy',
              property: 'article:author',
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
              content: `${siteTitle} · Authors`,
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
          title={`${siteTitle} · Authors`}
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
        <Chip name='Authors' />
        {authors.map(author => {
          return (
            <Card
              key={`author-${author.user}`}
              slug={`/author/${author.user}`}
              banner={author.banner.childImageSharp.fluid}
              title={author.name}
              link={true}
            >
              <FaFacebook />{' '}
              <a href={author.facebook} rel='noopener noreferrer' target='_blank'>
                {author.facebook.split('/')[3]}
              </a>
              <br />
              <FaTwitter />{' '}
              <a
                href={'https://twitter.com/' + author.twitter.split('@')[1]}
                rel='noopener noreferrer'
                target='_blank'
              >
                {author.twitter}
              </a>
            </Card>
          )
        })}
      </>
    )
  }
}

export const pageQuery = graphql`
  query authorPageQuery {
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
