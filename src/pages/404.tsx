import {graphql} from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import {FluidObject} from 'gatsby-image'

import {Card} from '../components/card'

interface PropsInterface {
  data: {
    site: {
      siteMetadata: {
        title: string,
        siteUrl: string,
        author: string,
        fbApp: string,
      },
    },
    banner: {
      childImageSharp: {
        fluid: FluidObject,
      },
    },
  },
}
export default class NotFoundPage extends React.Component<PropsInterface> {
  public render(): object {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const facebookAppID = this.props.data.site.siteMetadata.fbApp
    const siteDescription = 'Requested page is not exist!'
    const bannerUrl = this.props.data.banner.childImageSharp.fluid.src

    return (
      <>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              content: `${siteTitle} · Not Found`,
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
              content: `${siteTitle} · Not Found`,
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
              content: siteUrl + bannerUrl,
              property: 'og:image',
            },
            {
              content: siteUrl + bannerUrl,
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
              content: siteUrl + bannerUrl,
              name: 'twitter:image',
            },
          ]}
          title={`${siteTitle} · Not Found`}
        />
        <Card
          slug='/'
          banner={this.props.data.banner.childImageSharp.fluid}
          title='NOT FOUND'
          subtitle='Whoops! Looks like you&#39;re lost in the woods...with Cirno.'
          link={false}
        >
          <a href='/'>Back to home</a>
        </Card>
      </>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
        author
        fbApp
      }
    }
    banner: file(relativePath: {eq: "404.jpg"}) {
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
